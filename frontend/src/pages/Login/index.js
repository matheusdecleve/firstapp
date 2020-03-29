import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

import { FiLogIn } from 'react-icons/fi';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Login(){
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e){
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');

    } catch (err) {
      alert('Falha no login, tente novamente por favor.')
    }
  }

  return(
    <div className="loginContainer">
      <section className="form">
        <img src={logoImg} alt="First App" />

        <form onSubmit={handleLogin}>
          <h1>Bem-vindo(a)</h1>

          <input 
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="backLink" to="/register">
            <FiLogIn size={16} color="#0052cc" />
            Cadastrar-se agora
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Hero IMG" />
    </div>
  );
}