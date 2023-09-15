import { useForm } from 'react-hook-form';

const Input = ({
  id,
  label,
  type,
  extraClass,
  disabled,
  required,
  errors,
  register,
}) => {
  return (
    <div className='w-full'>
      <label
        className={`
            text-md
            ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
          `}>
        {label}
      </label>
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=' '
        type={type}
        className={`
            mt-2
            w-full
            p-3
            font-light 
            bg-white 
            border
            rounded-md
            outline-none
            disabled:opacity-70
            disabled:cursor-not-allowed
            ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
            ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
            ${extraClass}
          `}
      />
    </div>
  );
};

export default Input;
