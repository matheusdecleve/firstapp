import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

export default function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e){
    e.preventDefault();

    const data = {
      name, email, whatsapp, city, uf
    };

    try {
      const response = await api.post('ongs', data);

      alert(`Seu cadastro foi concluido com sucesso. Seu ID de acesso é: ${response.data.id}`);
      //Volta para a página de login
      history.push('/');
    } catch(err) {
      alert('Erro ao cadastrar ONG.')
    }
  }

  return (
    <div className="registerContainer">
      <div className="content">
        <section>
          <img src={logoImg} alt="Logo" />

          <h1>Cadastre-se</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude as pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="backLink" to="/">
            <FiArrowLeft size={16} color="#0052cc" />
            Voltar para login
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input             
            placeholder="Nome da ONG" 
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input 
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="inputGroup">
            <input 
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              style={{ width:80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button type="submit" className="button">Cadastrar</button>

        </form>
      </div>
    </div>
  );
}