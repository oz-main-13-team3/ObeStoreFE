import type { InputHTMLAttributes, ReactNode } from 'react';
import type { ChangeEvent } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'filled' | 'hollow' | 'gnb';
  fullWidth?: boolean;
  px?: number | string; // x축 padding
  py?: number | string; // y축 padding
}

import type { HTMLAttributes } from 'react';

export interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export interface EmailProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  id?: string;
  placeholder?: string;
  fullWidth?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PasswordProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  id?: string;
  placeholder?: string;
  fullWidth?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  id?: string;
  placeholder?: string;
  fullWidth?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  inputMargin?: string;
}

export interface CheckboxAloneProps {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export interface RadioProps {
  id: string;
  value: string;
  checked: boolean;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}

export interface EmailProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  id?: string;
  placeholder?: string;
  fullWidth?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PasswordProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  id?: string;
  placeholder?: string;
  fullWidth?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  id?: string;
  placeholder?: string;
  fullWidth?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  inputId?: string;
}

export interface CheckboxAloneProps {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export interface RadioProps {
  id: string;
  value: string;
  checked: boolean;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}

export interface SelectOption {
  value?: string;
  label?: string;
}

export interface SelectBoxProps {
  id?: string;
  name?: string;
  options: SelectOption[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
  buttons?: boolean;
  [property: string]: any;
}

export interface SubtitleProps {
  label: string;
}
