import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders A royal flush win', () => {
  const mockHand = [
    {
      handOne: ['TC', 'JC', 'QC', 'KC', 'AC'],
      handTwo: ['7D', '2S', '5D', '3S', 'AD'],
    },
  ];
  render(<App hands={mockHand} />);
  expect(screen.getByText('Player ONE wins, ROYAL FLUSH')).toBeInTheDocument();
});

test('renders A straight flush win', () => {
  const mockHand = [
    {
      handOne: ['2C', '3C', '4C', '5C', '6C'],
      handTwo: ['7D', '2S', '5D', '3S', 'AC'],
    },
  ];
  render(<App hands={mockHand} />);
  expect(
    screen.getByText('Player ONE wins, STRAIGHT FLUSH')
  ).toBeInTheDocument();
});

test('renders A four of a kind win', () => {
  const mockHand = [
    {
      handOne: ['2C', '2S', '2H', '2D', '6C'],
      handTwo: ['7D', '3S', '5D', '3S', 'AC'],
    },
  ];
  render(<App hands={mockHand} />);
  expect(
    screen.getByText('Player ONE wins, FOUR OF A KIND')
  ).toBeInTheDocument();
});

test('renders A full house win', () => {
  const mockHand = [
    {
      handOne: ['2C', '2S', '3H', '3D', '3C'],
      handTwo: ['7D', '4S', '5D', '4S', 'AC'],
    },
  ];
  render(<App hands={mockHand} />);
  expect(screen.getByText('Player ONE wins, FULL HOUSE')).toBeInTheDocument();
});

test('renders A flush win', () => {
  const mockHand = [
    {
      handOne: ['2C', '6C', '9C', 'TC', 'KC'],
      handTwo: ['7D', '4S', '5D', '4S', 'AC'],
    },
  ];
  render(<App hands={mockHand} />);
  expect(screen.getByText('Player ONE wins, FLUSH')).toBeInTheDocument();
});

test('renders A straight win', () => {
  const mockHand = [
    {
      handOne: ['2C', '3D', '4C', '5C', '6S'],
      handTwo: ['7D', '4S', '5D', '4S', 'AC'],
    },
  ];
  render(<App hands={mockHand} />);
  expect(screen.getByText('Player ONE wins, STRAIGHT')).toBeInTheDocument();
});

test('renders A three of a kind win', () => {
  const mockHand = [
    {
      handOne: ['2C', '2D', '2C', '5C', '6S'],
      handTwo: ['7D', '4S', '5D', '4S', 'AC'],
    },
  ];
  render(<App hands={mockHand} />);
  expect(
    screen.getByText('Player ONE wins, THREE OF A KIND')
  ).toBeInTheDocument();
});

test('renders A two pair win', () => {
  const mockHand = [
    {
      handOne: ['2C', '2D', '6C', '5C', '6S'],
      handTwo: ['7D', '4S', '5D', '4S', 'AC'],
    },
  ];
  render(<App hands={mockHand} />);
  expect(screen.getByText('Player ONE wins, TWO PAIR')).toBeInTheDocument();
});

test('renders A pair win', () => {
  const mockHand = [
    {
      handOne: ['2C', '2D', '7C', '5C', '6S'],
      handTwo: ['7D', '4S', '5D', '6S', 'AC'],
    },
  ];
  render(<App hands={mockHand} />);
  expect(screen.getByText('Player ONE wins, PAIR')).toBeInTheDocument();
});

test('renders A SPLIT POT with royal flush', () => {
  const mockHand = [
    {
      handOne: ['TC', 'JC', 'QC', 'KC', 'AC'],
      handTwo: ['TD', 'JD', 'QD', 'KD', 'AD'],
    },
  ];
  render(<App hands={mockHand} />);
  expect(screen.getByText('SPLIT POT, ROYAL FLUSH')).toBeInTheDocument();
});

test('renders A STRAIGHT_FLUSH tie breaker', () => {
  const mockHand = [
    {
      handOne: ['2C', '3C', '4C', '5C', '6C'],
      handTwo: ['2D', '3D', '4D', '5D', '6D'],
    },
  ];
  render(<App hands={mockHand} />);
  expect(screen.getByText("It's a tie STRAIGHT FLUSH")).toBeInTheDocument();
});

test('renders A STRAIGHT tie breaker', () => {
  const mockHand = [
    {
      handOne: ['2C', '3S', '4C', '5S', '6C'],
      handTwo: ['2S', '3D', '4D', '5S', '6D'],
    },
  ];
  render(<App hands={mockHand} />);
  expect(screen.getByText("It's a tie STRAIGHT")).toBeInTheDocument();
});

test('renders A FOUR_OF_A_KIND tie breaker', () => {
  const mockHand = [
    {
      handOne: ['3C', '3S', '3H', '3D', '6C'],
      handTwo: ['2C', '2S', '2H', '2D', '6D'],
    },
  ];
  render(<App hands={mockHand} />);
  expect(
    screen.getByText('Player ONE wins, FOUR OF A KIND HIGH CARD')
  ).toBeInTheDocument();
});

test('renders A FULL_HOUSE tie breaker', () => {
  const mockHand = [
    {
      handOne: ['5C', '5S', '4H', '4D', '4C'],
      handTwo: ['2C', '2S', '3H', '3D', '3C'],
    },
  ];
  render(<App hands={mockHand} />);
  expect(
    screen.getByText('Player ONE wins, FULL HOUSE HIGH CARD')
  ).toBeInTheDocument();
});

test('renders A FLUSH tie breaker', () => {
  const mockHand = [
    {
      handOne: ['5C', '6C', '8C', '9C', 'JC'],
      handTwo: ['4H', '6H', '8H', '9H', 'TH'],
    },
  ];
  render(<App hands={mockHand} />);
  expect(
    screen.getByText('Player ONE wins, FLUSH HIGH CARD')
  ).toBeInTheDocument();
});

test('renders A THREE_OF_A_KIND tie breaker', () => {
  const mockHand = [
    {
      handOne: ['5C', '5C', '5D', '9C', 'JC'],
      handTwo: ['4C', '4C', '4D', '9H', 'TH'],
    },
  ];
  render(<App hands={mockHand} />);
  expect(
    screen.getByText('Player ONE wins, THREE OF A KIND HIGH CARD')
  ).toBeInTheDocument();
});

test('renders A TWO_PAIR tie breaker', () => {
  const mockHand = [
    {
      handOne: ['2C', '2D', '4S', '4H', '8D'],
      handTwo: ['2S', '2H', '4C', '4D', '6C'],
    },
  ];
  render(<App hands={mockHand} />);
  expect(
    screen.getByText('Player ONE wins, TWO PAIR HIGH CARD')
  ).toBeInTheDocument();
});

test('renders A PAIR tie breaker', () => {
  const mockHand = [
    {
      handOne: ['2C', '2D', '4S', '5H', '8D'],
      handTwo: ['2S', '2H', '4C', '5D', '6C'],
    },
  ];
  render(<App hands={mockHand} />);
  expect(
    screen.getByText('Player ONE wins, PAIR HIGH CARD')
  ).toBeInTheDocument();
});

test('renders A HIGH CARD tie breaker', () => {
  const mockHand = [
    {
      handOne: ['2C', '7D', '4S', '5H', '8D'],
      handTwo: ['2S', '7H', '4C', '5D', '6C'],
    },
  ];
  render(<App hands={mockHand} />);
  expect(screen.getByText('Player ONE wins, HIGH CARD')).toBeInTheDocument();
});
