export type BubbleIconProps = {
  interpretation?: string;
  result: string | number;
  className?: string;
};

export const BubbleIcon = ({ className, result, interpretation }: BubbleIconProps) =>
  interpretation ? (
    <div className={className}>
      {result} - {interpretation}
    </div>
  ) : (
    <div className={className}>{result}</div>
  );
