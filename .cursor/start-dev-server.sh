#!/usr/bin/env bash
# Bring up the Vite dev server for the plan prototype.
#
# The server runs inside a detached tmux session rather than in this script's
# foreground. That keeps the environment's start command short-lived, so the
# server can later be stopped and restarted on its own without the forwarded
# port going down with it. Re-running this script is safe: it leaves an
# already-healthy server alone.
set -euo pipefail

PORT=5174
SESSION=dev
TMUX_CONF=/exec-daemon/tmux.portal.conf
LOG=/tmp/dev-server.log

run_tmux() {
  if [ -f "$TMUX_CONF" ]; then
    tmux -f "$TMUX_CONF" "$@"
  else
    tmux "$@"
  fi
}

is_up() {
  curl -fsS -o /dev/null --max-time 2 "http://127.0.0.1:${PORT}/" 2>/dev/null
}

wait_until_up() {
  for _ in $(seq 1 90); do
    if is_up; then
      return 0
    fi
    sleep 1
  done
  return 1
}

if is_up; then
  echo "dev server already serving on port ${PORT}"
  exit 0
fi

if command -v tmux >/dev/null 2>&1; then
  run_tmux kill-session -t "=${SESSION}" 2>/dev/null || true
  run_tmux new-session -d -s "${SESSION}" -c "$(pwd)" -- npm run dev
  echo "started dev server in tmux session '${SESSION}'"
else
  # No tmux in this image: fall back to a detached process with a log file.
  setsid nohup npm run dev >"${LOG}" 2>&1 &
  echo "started dev server detached; logs at ${LOG}"
fi

if wait_until_up; then
  echo "dev server ready on port ${PORT}"
  exit 0
fi

echo "dev server did not become ready on port ${PORT}" >&2
if command -v tmux >/dev/null 2>&1; then
  run_tmux capture-pane -p -t "${SESSION}:0.0" 2>/dev/null | tail -40 >&2 || true
fi
[ -f "${LOG}" ] && tail -40 "${LOG}" >&2
exit 1
