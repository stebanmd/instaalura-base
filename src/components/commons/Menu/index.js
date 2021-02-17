import React from 'react'
import { Logo } from '../../../theme/Logo'
import { MenuWrapper } from './styles/MenuWrapper'


export default function Menu() {
  const links = [
    {
      text: 'Home',
      url: '/'
    },
    {
      text: 'Perguntas Frequentes',
      url: '/faq'
    },
    {
      text: 'Sobre',
      url: '/about'
    }
  ]
  return (
    <MenuWrapper>
      <MenuWrapper.LeftSide>
        <Logo />
      </MenuWrapper.LeftSide>
      <MenuWrapper.Central>
        {links.map((link, i) => (
          <li key={i}>
            <a href={link.url}>{link.text}</a>
          </li>
        ))}
      </MenuWrapper.Central>
      <MenuWrapper.RightSide>
        <button>Entrar</button>
        <button>Cadastrar</button>
      </MenuWrapper.RightSide>
    </MenuWrapper>
  )
}

