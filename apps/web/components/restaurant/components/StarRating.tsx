import { IconStarFilled, IconStar } from '@tabler/icons-react';

export function StarRating({
  value,
  size = 16,
}: {
  value: number;
  size?: number;
}) {
  const rounded = Math.round(value);
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`Rating: ${value} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) =>
        i <= rounded ? (
          <IconStarFilled key={i} size={size} className="text-amber" />
        ) : (
          <IconStar key={i} size={size} className="text-muted-foreground/40" />
        ),
      )}
    </span>
  );
}
