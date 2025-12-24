import type { Preview } from '@storybook/react';
import React from 'react';
import '../src/styles/globals.css';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        nextjs: {
            appDirectory: true,
        },
    },
    globalTypes: {
        theme: {
            description: 'Global theme for components',
            defaultValue: 'light',
            toolbar: {
                title: 'Theme',
                icon: 'circlehollow',
                items: ['light', 'dark'],
                dynamicTitle: true,
            },
        },
    },
    decorators: [
        (Story, context) => {
            const theme = (context.globals?.theme as string) || 'light';
            return React.createElement(
                'div',
                { className: theme, 'data-theme': theme },
                React.createElement(
                    'div',
                    { className: 'min-h-screen bg-white dark:bg-secondary-900' },
                    React.createElement(Story)
                )
            );
        },
    ],
};

export default preview;
