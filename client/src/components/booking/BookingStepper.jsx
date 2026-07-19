import { useState } from "react";
import { Check } from "lucide-react";
import clsx from "clsx";
import { StepDates } from "./StepDates";
import { StepRoom } from "./StepRoom";
import { StepGuestDetails } from "./StepGuestDetails";
import { StepPayment } from "./StepPayment";
import { StepConfirmation } from "./StepConfirmation";

const steps = ["Dates", "Room", "Details", "Payment"];

export function BookingStepper({ initialData }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState(initialData);
  const [booking, setBooking] = useState(null);

  function handleNext(partial) {
    setData((prev) => ({ ...prev, ...partial }));
    setStepIndex((i) => i + 1);
  }

  function handleBookingComplete(partial) {
    setBooking(partial.booking);
    setStepIndex(steps.length);
  }

  function handleBack() {
    setStepIndex((i) => Math.max(0, i - 1));
  }

  if (booking) {
    return <StepConfirmation booking={booking} />;
  }

  return (
    <div>
      <div className="mx-auto mb-14 flex max-w-lg items-center justify-between">
        {steps.map((label, i) => (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={clsx(
                  "flex h-9 w-9 items-center justify-center rounded-full border text-sm",
                  i < stepIndex && "border-gold bg-gold text-ink",
                  i === stepIndex && "border-gold text-gold",
                  i > stepIndex && "border-ink/15 text-stone"
                )}
              >
                {i < stepIndex ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className="text-[11px] uppercase tracking-wider text-stone">{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={clsx("mx-2 h-px flex-1", i < stepIndex ? "bg-gold" : "bg-ink/10")} />
            )}
          </div>
        ))}
      </div>

      {stepIndex === 0 && <StepDates data={data} onNext={handleNext} />}
      {stepIndex === 1 && <StepRoom data={data} onNext={handleNext} onBack={handleBack} />}
      {stepIndex === 2 && <StepGuestDetails data={data} onNext={handleNext} onBack={handleBack} />}
      {stepIndex === 3 && <StepPayment data={data} onNext={handleBookingComplete} onBack={handleBack} />}
    </div>
  );
}
