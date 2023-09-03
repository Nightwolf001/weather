import { describe, it, expect } from '@jest/globals';
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Home from './index';

describe('Home component', () => {
    it('should render loading indicator when loading', async () => {
        const { getByTestId } = render(<Home />);
        const loader = getByTestId('loader');
        await waitFor(() => expect(loader).toBeDefined());
    });
});