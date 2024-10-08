import { memo } from 'react';

const ErrorMessage = memo(() => {
  return (
    <div>
      <p>No images found!</p>
    </div>
  );
});

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;