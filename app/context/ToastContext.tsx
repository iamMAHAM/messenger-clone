import { FC } from 'react';
import { Toaster, ToasterProps } from 'react-hot-toast';

interface ToastContextProps extends ToasterProps {}

const ToastContext: FC<ToastContextProps> = (props) => {
  return <Toaster {...props} />;
};

export default ToastContext;
