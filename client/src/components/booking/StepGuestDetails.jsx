import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/Button";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  specialRequests: z.string().optional(),
});

export function StepGuestDetails({ data, onNext, onBack }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: data.guestDetails || { fullName: "", email: "", phone: "", specialRequests: "" },
  });

  function onSubmit(values) {
    onNext({ guestDetails: values });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-lg">
      <h2 className="font-display text-3xl text-ink">Your Details</h2>
      <p className="mt-2 text-sm text-stone">Tell us who we should prepare your stay for.</p>

      <div className="mt-8 space-y-5">
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Full Name</span>
          <input {...register("fullName")} className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm" />
          {errors.fullName && <span className="text-xs text-red-600">{errors.fullName.message}</span>}
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Email</span>
          <input {...register("email")} type="email" className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm" />
          {errors.email && <span className="text-xs text-red-600">{errors.email.message}</span>}
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Phone</span>
          <input {...register("phone")} type="tel" className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm" />
          {errors.phone && <span className="text-xs text-red-600">{errors.phone.message}</span>}
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Special Requests (optional)</span>
          <textarea
            {...register("specialRequests")}
            rows={3}
            className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm"
          />
        </label>
      </div>

      <div className="mt-8 flex gap-4">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button type="submit" variant="primary" className="flex-1">
          Continue
        </Button>
      </div>
    </form>
  );
}
