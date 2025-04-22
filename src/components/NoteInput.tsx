interface NoteInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  className?: string;
}

export const NoteInput = ({ value, onChange, maxLength = 200, className = '' }: NoteInputProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="note" className="block text-sm font-medium text-gray-700">
        How was your day?
      </label>
      <textarea
        id="note"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder="Write a short note about your day..."
        className={`
          w-full px-3 py-2 rounded-lg
          focus:outline-none resize-none h-24
          ${className}
        `}
      />
      <div className="flex justify-end">
        <span className="text-sm text-gray-500">
          {value.length}/{maxLength} characters
        </span>
      </div>
    </div>
  );
}; 