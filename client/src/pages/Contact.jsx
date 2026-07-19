import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, MapPin, CircleCheck } from "lucide-react";
import { sendMessage } from "../api/contact";
import { useHotelConfig } from "../context/HotelConfigContext";
import { Section } from "../components/ui/Section";
import { RevealOnScroll } from "../components/ui/RevealOnScroll";
import { Button } from "../components/ui/Button";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Please enter a message of at least 10 characters"),
});

export default function Contact() {
  const { config } = useHotelConfig();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const mutation = useMutation({ mutationFn: sendMessage, onSuccess: () => reset() });

  return (
    <>
      <Helmet>
        <title>Contact — {config.hotelName}</title>
      </Helmet>

      <div className="bg-ink pb-20 pt-40 text-center text-warm-white">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold-light">Get in Touch</p>
        <h1 className="font-display text-4xl md:text-6xl">Contact Us</h1>
      </div>

      <Section className="bg-warm-white pt-16">
        <div className="grid gap-14 lg:grid-cols-2">
          <RevealOnScroll>
            <h2 className="font-display text-3xl text-ink">Send a Message</h2>

            {mutation.isSuccess ? (
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-6 text-green-700">
                <CircleCheck className="h-6 w-6 shrink-0" />
                <p className="text-sm">Thank you — your message has been received. We'll respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit((v) => mutation.mutate(v))} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-1">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Name</span>
                    <input {...register("name")} className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm" />
                    {errors.name && <span className="text-xs text-red-600">{errors.name.message}</span>}
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Email</span>
                    <input {...register("email")} className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm" />
                    {errors.email && <span className="text-xs text-red-600">{errors.email.message}</span>}
                  </label>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-1">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Phone (optional)</span>
                    <input {...register("phone")} className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm" />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Subject</span>
                    <input {...register("subject")} className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm" />
                  </label>
                </div>
                <label className="flex flex-col gap-1">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-stone">Message</span>
                  <textarea {...register("message")} rows={5} className="rounded-lg border border-ink/10 px-3 py-2.5 text-sm" />
                  {errors.message && <span className="text-xs text-red-600">{errors.message.message}</span>}
                </label>

                {mutation.isError && (
                  <p className="text-sm text-red-600">{mutation.error.message}</p>
                )}

                <Button type="submit" variant="primary" disabled={mutation.isPending}>
                  {mutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="space-y-6">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-stone/10">
                {config.contact?.mapEmbedUrl && (
                  <iframe title="Location" src={config.contact.mapEmbedUrl} className="h-full w-full" loading="lazy" />
                )}
              </div>
              <div className="space-y-4 rounded-2xl border border-ink/10 p-7 text-sm text-stone">
                {config.contact?.address && (
                  <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-gold" /> {config.contact.address}</p>
                )}
                {config.contact?.phone && (
                  <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-gold" /> {config.contact.phone}</p>
                )}
                {config.contact?.email && (
                  <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-gold" /> {config.contact.email}</p>
                )}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Section>
    </>
  );
}
