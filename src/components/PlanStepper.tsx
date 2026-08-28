import { PLAN_STEPS, type PlanStepId } from '../data/planCatalog';
import './PlanStepper.css';

type PlanStepperProps = {
  activeStep: PlanStepId;
  onStepChange: (stepId: PlanStepId) => void;
};

const RING_SIZE = 76;
const RING_STROKE = 4.5;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export function PlanStepper({ activeStep, onStepChange }: PlanStepperProps) {
  const total = PLAN_STEPS.length;
  const activeIndex = Math.max(
    0,
    PLAN_STEPS.findIndex((step) => step.id === activeStep),
  );
  const current = PLAN_STEPS[activeIndex] ?? PLAN_STEPS[0];
  const next = PLAN_STEPS[activeIndex + 1];
  const stepNumber = activeIndex + 1;
  const progress = stepNumber / total;
  const dashOffset = RING_CIRCUMFERENCE * (1 - progress);
  const statusLabel = next
    ? `Step ${stepNumber} of ${total}: ${current.title}. Next: ${next.title}`
    : `Step ${stepNumber} of ${total}: ${current.title}. Last step`;

  return (
    <div className="stickyTabsBar planStepperBar">
      <div className="planStepperHeader" role="status" aria-label={statusLabel}>
        <div className="planStepperRing" aria-hidden="true">
          <svg
            className="planStepperRingSvg"
            viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
            width={RING_SIZE}
            height={RING_SIZE}
          >
            <circle
              className="planStepperRingTrack"
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              fill="none"
              strokeWidth={RING_STROKE}
            />
            <circle
              className="planStepperRingProgress"
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              fill="none"
              strokeWidth={RING_STROKE}
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
            />
          </svg>
          <span className="planStepperCount">
            {stepNumber} of {total}
          </span>
        </div>

        <div className="planStepperCopy">
          <p className="planStepperTitle" id={`plan-step-${current.id}`}>
            {current.title}
          </p>
          {next ? (
            <button
              type="button"
              className="planStepperNext"
              onClick={() => onStepChange(next.id)}
            >
              Next: {next.title}
            </button>
          ) : (
            <p className="planStepperNextHint">Next: Checkout</p>
          )}
        </div>
      </div>
    </div>
  );
}
