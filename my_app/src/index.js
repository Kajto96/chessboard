import ReactDOM from 'react-dom/client';
import Board from './App';
import "./chessboard.css"
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<Board />);