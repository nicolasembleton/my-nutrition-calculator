import React from 'react';

interface FormHeaderProps {
  title: string;
}

export const FormHeader = ({ title }: FormHeaderProps) => (
  <div className="nutrition-form-card-header">
    <h2>{title}</h2>
  </div>
);
