type Props = {
  disabled: boolean;
  onImport: () => void;
};

export default function ImportButton({
  disabled,
  onImport,
}: Props) {
  return (
    <div className="mt-8 flex justify-end">
      <button
        onClick={onImport}
        disabled={disabled}
        className={`
          px-6
          py-3
          rounded-xl
          font-semibold
          transition
          ${
            disabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }
        `}
      >
        {disabled ? "Processing..." : "Confirm Import"}
      </button>
    </div>
  );
}