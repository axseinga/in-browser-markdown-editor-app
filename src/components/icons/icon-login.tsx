type IconProps = {
  color?: string;
  title?: string;
};

export const IconLogin = ({ color = "#FFFFFF", title }: IconProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <g clipPath="url(#clip0_16_11)">
        <circle cx="10" cy="6" r="6" fill={color} />
        <ellipse cx="10" cy="21" rx="10" ry="8" fill={color} />
      </g>
      <defs>
        <clipPath id="clip0_16_11">
          <rect width="20" height="20" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
