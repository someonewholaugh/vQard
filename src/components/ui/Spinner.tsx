export const Spinner = () => {
  return (
    <div
      className="animate-spin inline-block size-16 border-[0.25rem] border-current border-t-transparent text-white rounded-full"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
