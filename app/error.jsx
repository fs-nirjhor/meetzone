"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col gap-3 items-center justify-center h-screen text-center">
      <h2 className="text-red-500 text-xl font-semibold">{error?.message}</h2>
      <button
        onClick={() => reset()}
        className="py-2 px-5 rounded-lg bg-purple-1 hover:bg-opacity-80 text-light-1"
      >
        Try again
      </button>
    </div>
  );
}
