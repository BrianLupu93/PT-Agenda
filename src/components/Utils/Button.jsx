const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  bgClass,
  extraClass,
  borderClass,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        active:bg-zinc-900
        focus:bg-blue-600
        focus:border-blue-600
        ${outline ? 'bg-white' : bgClass ? bgClass : 'bg-rose-500'}
        ${outline ? 'border-black' : bgClass ? borderClass : 'border-rose-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
        ${extraClass}
      `}>
      {label}
    </button>
  );
};

export default Button;
