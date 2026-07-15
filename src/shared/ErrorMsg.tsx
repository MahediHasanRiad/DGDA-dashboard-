
interface ErrorMsgProps {
  message?: string;
}

export function ErrorMsg({ message }: ErrorMsgProps) {
  if (!message) return null;

  return (
    <div className="text-red-500 text-xs font-medium mt-1 animate-in fade-in-50 duration-200">
      <p>{message}</p>
    </div>
  )
}

export default ErrorMsg;
