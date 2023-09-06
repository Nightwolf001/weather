import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Home from './index';

describe('Home', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId('home-screen')).toBeDefined();
  });

  it('navigates to AddLocation screen when add icon is pressed', () => {
    const { getByTestId } = render(<Home />);
    fireEvent.press(getByTestId('add-icon'));
    expect(navigation.navigate).toHaveBeenCalledWith('AddLocation');
  });

  it('displays SeaThemeHeader when theme is sea', () => {
    const { getByTestId } = render(<Home theme="sea" />);
    expect(getByTestId('sea-theme-header')).toBeDefined();
  });

  it('displays ForestThemeHeader when theme is forest', () => {
    const { getByTestId } = render(<Home theme="forest" />);
    expect(getByTestId('forest-theme-header')).toBeDefined();
  });

  it('displays correct background color based on weather conditions', () => {
    const { getByTestId } = render(<Home location_details={{ weather: { conditions: 'Sun' } }} />);
    expect(getByTestId('home-screen')).toHaveStyle({ backgroundColor: 'yellow' });
  });

  it('displays modal when map icon is pressed', () => {
    const { getByTestId } = render(<Home />);
    fireEvent.press(getByTestId('map-icon'));
    expect(getByTestId('modal')).toBeDefined();
  });

  it('displays modal when list icon is pressed', () => {
    const { getByTestId } = render(<Home />);
    fireEvent.press(getByTestId('list-icon'));
    expect(getByTestId('modal')).toBeDefined();
  });
});import { describe, it, expect } from '@jest/globals';
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