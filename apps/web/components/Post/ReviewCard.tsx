import { useState } from 'react';
import { IconX, IconStarFilled, IconArrowLeft } from '@tabler/icons-react';

import { Button } from '@ui/button';
import axios from 'axios';
import Cookies from 'js-cookie';

export function ReviewCard({
  open,
  onClose,
  restaurantName,
  restaurant_id,
  onSubmitted,
}: {
  open: boolean;
  onClose: () => void;
  restaurantName: string;
  restaurant_id: number;
  onSubmitted?: () => Promise<void> | void;
}) {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const max = 600;

  if (!open) return null;

  const next = () => setStep((s) => Math.min(2, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const submitReview = async () => {
    const token = Cookies.get('accessToken');
    if (!token) {
      setError('Please sign in before writing a review.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_DEV_URL}/reviews`,
        {
          rest_id: restaurant_id,
          rating,
          review_des: text.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await onSubmitted?.();
      close();
    } catch {
      setError('Could not submit your review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const close = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setRating(0);
      setText('');
      setError(null);
    }, 200);
  };

  return (
    <div
      className="bg-foreground/40 fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Write a review"
        onClick={(e) => e.stopPropagation()}
        className="bg-card flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl"
      >
        <div className="border-border flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-2">
            {step > 1 && (
              <Button
                onClick={back}
                aria-label="Back"
                className="hover:bg-stone text-muted-foreground rounded-full bg-transparent p-1"
              >
                <IconArrowLeft size={18} />
              </Button>
            )}
            <div>
              <p className="text-muted-foreground text-xs">Step {step} of 2</p>
              <h2 className="text-base font-medium">{restaurantName}</h2>
            </div>
          </div>
          <button
            onClick={close}
            aria-label="Close"
            className="hover:bg-stone rounded-full p-1"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* progress */}
        <div className="bg-stone h-1 w-full">
          <div
            className="bg-primary h-full transition-all"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          {step === 1 && (
            <div className="text-center">
              <h3 className="text-xl">How was it?</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Tap a star to rate.
              </p>
              <div className="mt-8 flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Button
                    key={i}
                    aria-label={`${i} star${i > 1 ? 's' : ''}`}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(i)}
                    className="rounded-lg bg-transparent p-1 transition-transform hover:scale-110"
                  >
                    <IconStarFilled
                      size={48}
                      className={
                        i <= (hover || rating)
                          ? 'text-amber'
                          : 'text-muted-foreground/50'
                      }
                    />
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* {step === 2 && (
            <div>
              <h3 className="text-xl">What was the vibe?</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Pick any that fit.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {vibes.map((v) => {
                  const active = selected.includes(v);
                  return (
                    <button
                      key={v}
                      onClick={() => toggle(v)}
                      className={`rounded-full px-4 py-2 text-sm transition-colors ${
                        active
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-stone text-foreground hover:bg-accent'
                      }`}
                    >
                      {v}
                    </button>
                  );
                })}
              </div>
            </div>
          )} */}

          {step === 2 && (
            <div>
              <h3 className="text-xl">Tell us more</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                What stood out?
              </p>
              <div className="relative mt-6">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, max))}
                  rows={8}
                  placeholder="The ramen broth was rich and balanced…"
                  className="border-border bg-background hover:border-primary/40 focus:border-primary w-full resize-none rounded-2xl border p-4 text-sm transition-colors outline-none"
                />
                <span className="text-muted-foreground absolute right-4 bottom-3 text-xs">
                  {text.length}/{max}
                </span>
              </div>
              {error && (
                <p className="text-destructive mt-3 text-sm">{error}</p>
              )}
            </div>
          )}

          {/* {step === 3 && (
            <div>
              <h3 className="text-xl">Add a photo (optional)</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Show off what you ordered.
              </p>
              <label className="border-border text-muted-foreground hover:border-primary hover:text-foreground mt-6 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 text-center transition-colors">
                <IconCloudUpload size={36} />
                <span className="text-sm">
                  Click to upload, or drag and drop
                </span>
                <span className="text-xs">PNG or JPG, up to 8 MB</span>
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
          )} */}
        </div>

        <div className="border-border bg-background/60 border-t p-4">
          {step < 2 ? (
            <button
              onClick={next}
              disabled={step === 1 && rating === 0}
              className="bg-primary text-primary-foreground hover:bg-primary-dark w-full rounded-full py-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={submitReview}
              disabled={isSubmitting || text.trim().length === 0}
              className="bg-primary text-primary-foreground hover:bg-primary-dark w-full rounded-full py-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit review'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
