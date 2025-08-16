import { useNavigate } from 'react-router-dom';
import { hideBackButton, onBackButtonClick, showBackButton } from '@telegram-apps/sdk-react';
import { type PropsWithChildren, useEffect } from 'react';

export function Page({ children, back = true, backTo }: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   */
  back?: boolean;
  /**
   * Specific path to navigate to when back button is clicked.
   * If not provided, will navigate to previous page in history.
   */
  backTo?: string;
}>) {
  const navigate = useNavigate();

  useEffect(() => {
    if (back) {
      showBackButton();
      return onBackButtonClick(() => {
        if (backTo) {
          navigate(backTo);
        } else {
          navigate(-1);
        }
      });
    }
    hideBackButton();
  }, [back, backTo, navigate]);

  return <>{children}</>;
}