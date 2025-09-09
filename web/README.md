# Noor - Interactive 3D Counting Web Page

An interactive web application for children to learn counting using colorful 3D interlocking cubes.

## Features

- **3D-Style Colorful Cubes**: Bright, appealing pseudo-3D cubes with gradients and shadows that children will love
- **Interactive Controls**: Simple buttons to add, remove, and reset cubes
- **Real-time Counting**: Live counter that updates as cubes are manipulated
- **Smooth Animations**: Engaging entrance and exit animations for cubes
- **Child-friendly Interface**: Large buttons, clear instructions, and fun colors
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Keyboard Support**: Arrow keys and +/- for quick interaction
- **Canvas Interaction**: Click anywhere on the canvas to add cubes

## How to Use

1. Open `web/index.html` in a modern web browser
2. Click "Add Cube" (➕) to place new colorful cubes
3. Click "Remove Cube" (➖) to remove the last cube
4. Click "Start Over" (🔄) to remove all cubes
5. Watch the counter update in real-time
6. Use keyboard shortcuts for faster interaction:
   - `↑` or `+` to add a cube
   - `↓` or `-` to remove a cube
   - `R` to reset all cubes
7. Click anywhere on the canvas to add cubes

## Technical Implementation

- **HTML5 Canvas**: 2D graphics rendering with pseudo-3D effects
- **Modern CSS**: Gradient backgrounds, animations, and responsive design
- **ES6 JavaScript**: Modular, clean code structure
- **Progressive Enhancement**: Graceful fallbacks for loading issues
- **Animation Framework**: Smooth scaling, rotation, and color transitions

## File Structure

```
web/
├── index.html      # Main HTML structure
├── styles.css      # Styling and responsive design
├── script.js       # 2D cube logic and interactions
└── README.md       # This documentation
```

## Browser Compatibility

This application works on all modern browsers that support:
- HTML5 Canvas
- ES6 JavaScript features
- CSS Grid and Flexbox

Tested on:
- Chrome 90+
- Firefox 85+
- Safari 14+
- Edge 90+

## Educational Benefits

- **Number Recognition**: Visual counting from 0 upwards
- **Addition/Subtraction**: Understanding increment and decrement
- **Spatial Awareness**: Visual arrangement and pattern recognition
- **Cause and Effect**: Immediate visual feedback from actions
- **Motor Skills**: Click coordination and interaction
- **Color Recognition**: Bright, varied colors for each cube

## Accessibility

- Large, clearly labeled buttons
- High contrast colors
- Keyboard navigation support
- Clear visual feedback
- Simple, intuitive interface
- Responsive design for various screen sizes

## Visual Features

- **Pseudo-3D Cubes**: Each cube has multiple faces with lighting effects
- **Dynamic Colors**: Random bright colors for visual appeal
- **Grid Layout**: Organized stacking pattern
- **Smooth Animations**: Scale and rotation effects
- **Shadow Effects**: Depth perception through shadows
- **Grid Background**: Visual structure for better spatial understanding

## Future Enhancements

Potential improvements could include:
- Sound effects for cube interactions
- Number pronunciation for audio learning
- Different cube arrangements (towers, patterns)
- Achievement system for reaching counting goals
- Multi-language support
- Touch gestures for mobile devices
- True 3D rendering with WebGL/Three.js when external libraries are available