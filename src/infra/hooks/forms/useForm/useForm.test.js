import { act, renderHook } from '@testing-library/react-hooks';
import { useForm } from './index';

describe('useForm()', () => {
  describe('when user types', () => {
    test('changes the value', () => {
      const { result } = renderHook(() => (
        useForm({
          initialValues: {
            nome: 'Test',
          },
        })
      ));

      expect(result.current.values).toEqual({ nome: 'Test' });

      const event = {
        target: {
          getAttribute: () => 'nome',
          value: 'Update',
        },
      };
      act(() => result.current.handleChange(event));
      expect(result.current.values).toEqual({ nome: 'Update' });
    });
  });
});
