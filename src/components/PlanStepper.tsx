import { PLAN_STEPS, type PlanStepId } from '../data/planCatalog';
import './PlanStepper.css';

type PlanStepperProps = {
  activeStep: PlanStepId;
  onStepChange: (stepId: PlanStepId) => void;
};

export function PlanStepper({ activeStep, onStepChange }: PlanStepperProps) {
  const activeIndex = PLAN_STEPS.findIndex((step) => step.id === activeStep);

  return (
    <div className="stickyTabsBar planStepperBar">
      <nav className="tabsNav" aria-label="Plan steps">
        <ol className="planStepperList">
          {PLAN_STEPS.map((step, index) => {
            const isActive = step.id === activeStep;
            const isDone = index < activeIndex;
            return (
              <li key={step.id} className="planStepperItem">
                {index > 0 ? <span className="planStepperConnector" aria-hidden="true" /> : null}
                <button
                  type="button"
                  id={`plan-step-${step.id}`}
                  className={`planStepperBtn${isActive ? ' planStepperBtnActive' : ''}${isDone ? ' planStepperBtnDone' : ''}`}
                  aria-current={isActive ? 'step' : undefined}
                  onClick={() => onStepChange(step.id)}
                >
                  <span className="planStepperIndex" aria-hidden="true">
                    {isDone ? '✓' : index + 1}
                  </span>
                  <span className="planStepperLabel">{step.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
