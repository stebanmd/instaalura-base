import React from 'react';
import { screen } from '@testing-library/react';
import TextField from './index';
import { render } from '../../../infra/test/testUtils';

describe('<TextField />', () => {
  test('renders component', () => {
    render(
      <TextField
        placeholder="Nome"
        value="Test"
        name="nome"
        onChange={() => {}}
      />
      ,
    );

    const textField = screen.getByPlaceholderText(/nome/i);

    expect(textField).toMatchSnapshot();
  });
});
