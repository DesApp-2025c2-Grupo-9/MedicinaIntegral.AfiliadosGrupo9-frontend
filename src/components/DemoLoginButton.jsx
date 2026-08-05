import Button from './Button';

function DemoLoginButton({ onClick, className }) {
  return (
    <Button
      type='button'
      style='outln'
      className={className}
      onClick={onClick}
    >
      Probar la aplicación
    </Button>
  );
}

export default DemoLoginButton;