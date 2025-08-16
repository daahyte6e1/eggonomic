import {
  Component,
  type ComponentType,
  type GetDerivedStateFromError,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

export interface ErrorBoundaryProps extends PropsWithChildren {
  fallback?: ReactNode | ComponentType<{ error: unknown }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  error?: unknown;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {};

  static getDerivedStateFromError: GetDerivedStateFromError<ErrorBoundaryProps, ErrorBoundaryState> = (error) => ({ 
    error 
  });

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Вызываем callback если предоставлен
    this.props.onError?.(error, errorInfo);
    
    this.setState({ error, errorInfo });
  }

  render() {
    const {
      state: { error, errorInfo },
      props: { fallback: Fallback, children },
    } = this;

    if (error) {
      // Если есть кастомный fallback, используем его
      if (Fallback) {
        return typeof Fallback === 'function' 
          ? <Fallback error={error} />
          : Fallback;
      }

      // Дефолтный fallback с более детальной информацией
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center',
          fontFamily: 'monospace',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          margin: '20px'
        }}>
          <h2>🚨 Произошла ошибка</h2>
          <p>Приложение столкнулось с неожиданной проблемой.</p>
          <details style={{ textAlign: 'left', marginTop: '15px' }}>
            <summary>Детали ошибки</summary>
            <div style={{ 
              backgroundColor: '#fff', 
              padding: '10px', 
              marginTop: '10px',
              borderRadius: '4px',
              border: '1px solid #ced4da'
            }}>
              <strong>Сообщение:</strong> {error instanceof Error ? error.message : JSON.stringify(error, null, 2)}
              {errorInfo && (
                <>
                  <br />
                  <strong>Компонент:</strong> {errorInfo.componentStack}
                </>
              )}
            </div>
          </details>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              marginTop: '15px',
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Перезагрузить страницу
          </button>
        </div>
      );
    }

    return children;
  }
}
