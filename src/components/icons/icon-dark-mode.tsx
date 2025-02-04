type IconProps = {
  color?: string;
  title?: string;
};

export const IconDarkMode = ({ color = "#5A6069", title }: IconProps) => {
  return (
    <svg width="17" height="16" xmlns="http://www.w3.org/2000/svg">
      {title && <title>{title}</title>}
      <path
        d="M16.141 8.804a.823.823 0 0 0-.864-.115 6.622 6.622 0 0 1-2.772.6A6.704 6.704 0 0 1 5.81 2.626 7.066 7.066 0 0 1 6.015.981a.823.823 0 0 0-1.094-.93 8.341 8.341 0 1 0 11.516 9.617.823.823 0 0 0-.296-.864Zm-7.814 5.503A6.696 6.696 0 0 1 4.164 2.404v.222a8.35 8.35 0 0 0 10.069 8.16 6.671 6.671 0 0 1-5.906 3.554v-.033Z"
        fill={color}
      />
    </svg>
  );
};
