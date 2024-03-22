import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

interface Props {
  text: string;
  path?: string; // Se for passado o botão será um link
  style?: React.CSSProperties; // Quando for necessário modificar algum estilo
}

// Botão normal com texto
function Button({ text, path, style }: Props) {
  return path ? (
    <Link className={styles.button} to={path} style={style}>
      {text}
    </Link>
  ) : (
    <button className={styles.button} style={style}>
      {text}
    </button>
  );
}

export default Button;