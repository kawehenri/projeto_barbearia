import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const Home = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <header style={{ borderBottom: '2px solid #333', paddingBottom: '20px', marginBottom: '40px' }}>
        <h1>Sistema de Barbearia</h1>
        <nav>
          {!authenticated && (
            <>
              <button onClick={() => navigate('/login')} style={{ marginRight: '10px' }}>
                Login
              </button>
              <button onClick={() => navigate('/register')}>
                Cadastrar
              </button>
            </>
          )}
        </nav>
      </header>
      
      <main style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2 style={{ fontSize: '3em', marginBottom: '20px' }}>
          Sistema de Barbearia
        </h2>
        <p style={{ fontSize: '1.5em', color: '#666', marginBottom: '40px' }}>
          Gerencie seus agendamentos de forma simples e eficiente
        </p>
        {!authenticated && (
          <div>
            <button 
              onClick={() => navigate('/register')}
              style={{
                padding: '15px 30px',
                fontSize: '1.2em',
                marginRight: '10px',
                cursor: 'pointer',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px'
              }}
            >
              Criar Conta
            </button>
            <button 
              onClick={() => navigate('/login')}
              style={{
                padding: '15px 30px',
                fontSize: '1.2em',
                cursor: 'pointer',
                backgroundColor: 'white',
                color: '#007bff',
                border: '2px solid #007bff',
                borderRadius: '5px'
              }}
            >
              Entrar
            </button>
          </div>
        )}
      </main>

      <footer style={{ borderTop: '2px solid #333', paddingTop: '20px', marginTop: '60px', textAlign: 'center' }}>
        <p>© {new Date().getFullYear()} Sistema de Barbearia. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;

