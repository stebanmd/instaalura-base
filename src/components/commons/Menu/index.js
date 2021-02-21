import React from 'react'
import { Logo } from '../../../theme/Logo'
import { MenuWrapper } from './styles/MenuWrapper'
import {Button} from '../Button'
import {Text} from '../../foundation/Text'


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
        {links.map((link) => (
          <li key={link.url}>
            <Text tag="a"
                  variant="smallestException"
                  href={link.url}>
              {link.text}
            </Text>
          </li>
        ))}
      </MenuWrapper.Central>
      <MenuWrapper.RightSide>
        <Button ghost variant="secondary.main">
          Entrar
        </Button>
        <Button variant="primary.main">
          Cadastrar
        </Button>
      </MenuWrapper.RightSide>
    </MenuWrapper>
  )
}

