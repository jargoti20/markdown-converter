# Markdown Converter

A markdown converter that allows you to convert markdown to HTML and vice versa. Code is formatted in Monokai style.

## Features

- Convert markdown to HTML
- Convert HTML to markdown
- Copy HTML or markdown to clipboard

## Technologies Used

- **Next.js 15**: A React framework for server-side rendering and static site generation.
- **TailwindCSS**: A utility-first CSS framework for styling.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.

## Installation

To get started with this project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/jargoti/markdown-converter.git
   cd markdown-converter
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   - Create a `.env.local` file in the root directory and add your Supabase credentials:

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

Simply enter markdown in the input field and the corresponding HTML will be displayed. The preview will update in real-time. Click 'Show Markdown' to display the markdown code. You can then click 'Copy HTML' or 'Copy Markdown' to copy the respective code to your clipboard.

### Components

#### ToggleSwitch

A component for toggling between two states. 

- **Props**:
  - `isChecked`: boolean - Indicates if the switch is on or off.
  - `onChange`: function - Callback function to handle state changes.

#### Markdown Converter

A component that converts markdown to HTML.

- **Props**:
  - `markdown`: string - The markdown text to be converted.
  - `onError`: function - Callback function to handle errors during conversion.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Notices

This project is just a prototype meaning the code is not optimized and not ready for production purposes. Use it at your own risk.

## Acknowledgments

- [React Markdown](https://github.com/remarkjs/react-markdown)
- [React Syntax Highlighter](https://github.com/conorhastings/react-syntax-highlighter)
- [Turndown](https://github.com/domchristie/turndown)
