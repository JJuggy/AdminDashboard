import React from 'react';
import { Check } from 'lucide-react';

type Step = {
  number: number;
  label: string;
};

type StepperProps = {
  steps: Step[];
  currentStep: number;
};

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="content-stretch flex items-center gap-[16px] relative shrink-0 w-full mb-[32px]">
      {steps.map((step, index) => {
        const isCompleted = step.number < currentStep;
        const isCurrent = step.number === currentStep;
        const isUpcoming = step.number > currentStep;

        return (
          <React.Fragment key={step.number}>
            <div className="content-stretch flex items-center gap-[8px] relative shrink-0">
              {/* Step Circle */}
              <div
                className={`flex items-center justify-center rounded-full shrink-0 size-[32px] font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] transition-colors ${
                  isCompleted
                    ? 'bg-lime-600 text-white'
                    : isCurrent
                    ? 'bg-zinc-950 text-white'
                    : 'bg-zinc-100 text-zinc-400'
                }`}
              >
                {isCompleted ? <Check className="w-[16px] h-[16px]" /> : step.number}
              </div>

              {/* Step Label */}
              <p
                className={`font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[14px] text-nowrap whitespace-pre ${
                  isCurrent ? 'text-zinc-950' : 'text-zinc-500'
                }`}
              >
                {step.label}
              </p>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-[2px] bg-zinc-200 relative">
                <div
                  className={`h-full transition-all duration-300 ${
                    step.number < currentStep ? 'bg-lime-600 w-full' : 'bg-transparent w-0'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
