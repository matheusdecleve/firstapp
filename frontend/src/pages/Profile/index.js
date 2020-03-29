import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

import { FiPower, FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

export default function Profile(){
  const [casos, setCasos] = useState([]);

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  const history = useHistory();

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setCasos(response.data.casos);
    })
  }, [ongId]);

  async function handleDeleteCaso(id) {
    try {
      await api.delete(`casos/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });

      setCasos(casos.filter(caso => caso.id !== id))
    } catch (err) {
      alert('Erro ao deletar caso.');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return(
    <div className="profileContainer">
      <header>
        <img src={logoImg} alt="Logo" />
        <span>Bem vindo(a), {ongName}</span>
        <Link className="button" to="/casos/novo">Cadastrar novo caso</Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#0052cc" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>    

      <ul> 
        {casos.map(caso => (
          <li key={caso.id}>
            <strong>CASO:</strong>
            <p>{caso.title}</p>

            <strong>DESCRIÇÃO</strong>
            <p>{caso.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.value)}</p>

            <button type="button" onClick={() => handleDeleteCaso(caso.id)}>
              <FiTrash2 size={10} color="#a8a8b3" />
            </button>
          </li>     
        ))}
      </ul>
    </div>
  );

}