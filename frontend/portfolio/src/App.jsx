import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import {
  Plus, Moon, Sun, X, ChevronDown, Sparkles, Eye, ArrowRight,
  ChevronLeft, ChevronRight, Menu, Upload, Trash2, Copy, Check,
  Briefcase, Edit2, Save, Trash, ChevronUp, Bold, Italic, Underline,
  Type, MoveVertical, AlignLeft, AlignCenter, AlignRight, List, Minus, Plus as PlusIcon,
  Palette, Search, ChevronDown as ChevronDownIcon
} from 'lucide-react'
import { useRef, useState, useEffect, useMemo } from 'react'
import { uploadToCloudinary, fetchImagesByTag, deleteFromCloudinary } from './CloudinaryService'

// Helper function to strip HTML for display
const stripHtml = (html) => {  
  if (!html) return '';
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || '';
}

// EXPANDED Color palette with 150+ colors
const colors = [
  // Basic Colors
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Red', value: '#FF0000' },
  { name: 'Lime', value: '#00FF00' },
  { name: 'Blue', value: '#0000FF' },
  { name: 'Yellow', value: '#FFFF00' },
  { name: 'Cyan', value: '#00FFFF' },
  { name: 'Magenta', value: '#FF00FF' },
  { name: 'Silver', value: '#C0C0C0' },
  { name: 'Gray', value: '#808080' },
  { name: 'Maroon', value: '#800000' },
  { name: 'Olive', value: '#808000' },
  { name: 'Green', value: '#008000' },
  { name: 'Purple', value: '#800080' },
  { name: 'Teal', value: '#008080' },
  { name: 'Navy', value: '#000080' },
  
  // Extended Colors
  { name: 'Indian Red', value: '#CD5C5C' },
  { name: 'Light Coral', value: '#F08080' },
  { name: 'Salmon', value: '#FA8072' },
  { name: 'Dark Salmon', value: '#E9967A' },
  { name: 'Light Salmon', value: '#FFA07A' },
  { name: 'Crimson', value: '#DC143C' },
  { name: 'Fire Brick', value: '#B22222' },
  { name: 'Dark Red', value: '#8B0000' },
  
  { name: 'Pink', value: '#FFC0CB' },
  { name: 'Light Pink', value: '#FFB6C1' },
  { name: 'Hot Pink', value: '#FF69B4' },
  { name: 'Deep Pink', value: '#FF1493' },
  { name: 'Pale Violet Red', value: '#DB7093' },
  { name: 'Medium Violet Red', value: '#C71585' },
  
  { name: 'Light Salmon', value: '#FFA07A' },
  { name: 'Coral', value: '#FF7F50' },
  { name: 'Tomato', value: '#FF6347' },
  { name: 'Orange Red', value: '#FF4500' },
  { name: 'Dark Orange', value: '#FF8C00' },
  { name: 'Orange', value: '#FFA500' },
  
  { name: 'Gold', value: '#FFD700' },
  { name: 'Yellow', value: '#FFFF00' },
  { name: 'Light Yellow', value: '#FFFFE0' },
  { name: 'Lemon Chiffon', value: '#FFFACD' },
  { name: 'Light Goldenrod', value: '#FAFAD2' },
  { name: 'Papaya Whip', value: '#FFEFD5' },
  { name: 'Moccasin', value: '#FFE4B5' },
  { name: 'Peach Puff', value: '#FFDAB9' },
  { name: 'Pale Goldenrod', value: '#EEE8AA' },
  { name: 'Khaki', value: '#F0E68C' },
  { name: 'Dark Khaki', value: '#BDB76B' },
  
  { name: 'Lavender', value: '#E6E6FA' },
  { name: 'Thistle', value: '#D8BFD8' },
  { name: 'Plum', value: '#DDA0DD' },
  { name: 'Violet', value: '#EE82EE' },
  { name: 'Orchid', value: '#DA70D6' },
  { name: 'Fuchsia', value: '#FF00FF' },
  { name: 'Magenta', value: '#FF00FF' },
  { name: 'Medium Orchid', value: '#BA55D3' },
  { name: 'Medium Purple', value: '#9370DB' },
  { name: 'Blue Violet', value: '#8A2BE2' },
  { name: 'Dark Violet', value: '#9400D3' },
  { name: 'Dark Orchid', value: '#9932CC' },
  { name: 'Dark Magenta', value: '#8B008B' },
  { name: 'Purple', value: '#800080' },
  { name: 'Indigo', value: '#4B0082' },
  { name: 'Slate Blue', value: '#6A5ACD' },
  { name: 'Dark Slate Blue', value: '#483D8B' },
  
  { name: 'Green Yellow', value: '#ADFF2F' },
  { name: 'Chartreuse', value: '#7FFF00' },
  { name: 'Lawn Green', value: '#7CFC00' },
  { name: 'Lime', value: '#00FF00' },
  { name: 'Lime Green', value: '#32CD32' },
  { name: 'Pale Green', value: '#98FB98' },
  { name: 'Light Green', value: '#90EE90' },
  { name: 'Medium Spring Green', value: '#00FA9A' },
  { name: 'Spring Green', value: '#00FF7F' },
  { name: 'Medium Sea Green', value: '#3CB371' },
  { name: 'Sea Green', value: '#2E8B57' },
  { name: 'Forest Green', value: '#228B22' },
  { name: 'Green', value: '#008000' },
  { name: 'Dark Green', value: '#006400' },
  { name: 'Yellow Green', value: '#9ACD32' },
  { name: 'Olive Drab', value: '#6B8E23' },
  { name: 'Olive', value: '#808000' },
  { name: 'Dark Olive Green', value: '#556B2F' },
  { name: 'Medium Aquamarine', value: '#66CDAA' },
  { name: 'Dark Sea Green', value: '#8FBC8F' },
  { name: 'Light Sea Green', value: '#20B2AA' },
  { name: 'Dark Cyan', value: '#008B8B' },
  { name: 'Teal', value: '#008080' },
  
  { name: 'Aqua', value: '#00FFFF' },
  { name: 'Cyan', value: '#00FFFF' },
  { name: 'Light Cyan', value: '#E0FFFF' },
  { name: 'Pale Turquoise', value: '#AFEEEE' },
  { name: 'Aquamarine', value: '#7FFFD4' },
  { name: 'Turquoise', value: '#40E0D0' },
  { name: 'Medium Turquoise', value: '#48D1CC' },
  { name: 'Dark Turquoise', value: '#00CED1' },
  { name: 'Cadet Blue', value: '#5F9EA0' },
  { name: 'Steel Blue', value: '#4682B4' },
  { name: 'Light Steel Blue', value: '#B0C4DE' },
  { name: 'Powder Blue', value: '#B0E0E6' },
  { name: 'Light Blue', value: '#ADD8E6' },
  { name: 'Sky Blue', value: '#87CEEB' },
  { name: 'Light Sky Blue', value: '#87CEFA' },
  { name: 'Deep Sky Blue', value: '#00BFFF' },
  { name: 'Dodger Blue', value: '#1E90FF' },
  { name: 'Cornflower Blue', value: '#6495ED' },
  { name: 'Medium Slate Blue', value: '#7B68EE' },
  { name: 'Royal Blue', value: '#4169E1' },
  { name: 'Blue', value: '#0000FF' },
  { name: 'Medium Blue', value: '#0000CD' },
  { name: 'Dark Blue', value: '#00008B' },
  { name: 'Navy', value: '#000080' },
  { name: 'Midnight Blue', value: '#191970' },
  
  { name: 'Cornsilk', value: '#FFF8DC' },
  { name: 'Blanched Almond', value: '#FFEBCD' },
  { name: 'Bisque', value: '#FFE4C4' },
  { name: 'Navajo White', value: '#FFDEAD' },
  { name: 'Wheat', value: '#F5DEB3' },
  { name: 'Burly Wood', value: '#DEB887' },
  { name: 'Tan', value: '#D2B48C' },
  { name: 'Rosy Brown', value: '#BC8F8F' },
  { name: 'Sandy Brown', value: '#F4A460' },
  { name: 'Goldenrod', value: '#DAA520' },
  { name: 'Dark Goldenrod', value: '#B8860B' },
  { name: 'Peru', value: '#CD853F' },
  { name: 'Chocolate', value: '#D2691E' },
  { name: 'Saddle Brown', value: '#8B4513' },
  { name: 'Sienna', value: '#A0522D' },
  { name: 'Brown', value: '#A52A2A' },
  { name: 'Maroon', value: '#800000' },
  
  { name: 'White', value: '#FFFFFF' },
  { name: 'Snow', value: '#FFFAFA' },
  { name: 'Honeydew', value: '#F0FFF0' },
  { name: 'Mint Cream', value: '#F5FFFA' },
  { name: 'Azure', value: '#F0FFFF' },
  { name: 'Alice Blue', value: '#F0F8FF' },
  { name: 'Ghost White', value: '#F8F8FF' },
  { name: 'White Smoke', value: '#F5F5F5' },
  { name: 'Seashell', value: '#FFF5EE' },
  { name: 'Beige', value: '#F5F5DC' },
  { name: 'Old Lace', value: '#FDF5E6' },
  { name: 'Floral White', value: '#FFFAF0' },
  { name: 'Ivory', value: '#FFFFF0' },
  { name: 'Antique White', value: '#FAEBD7' },
  { name: 'Linen', value: '#FAF0E6' },
  { name: 'Lavender Blush', value: '#FFF0F5' },
  { name: 'Misty Rose', value: '#FFE4E1' },
  
  { name: 'Gainsboro', value: '#DCDCDC' },
  { name: 'Light Gray', value: '#D3D3D3' },
  { name: 'Silver', value: '#C0C0C0' },
  { name: 'Dark Gray', value: '#A9A9A9' },
  { name: 'Gray', value: '#808080' },
  { name: 'Dim Gray', value: '#696969' },
  { name: 'Light Slate Gray', value: '#778899' },
  { name: 'Slate Gray', value: '#708090' },
  { name: 'Dark Slate Gray', value: '#2F4F4F' },
  { name: 'Black', value: '#000000' }
];

// Rich Text Editor Component - TRUE MS WORD EXPERIENCE for EVERY element
const RichTextEditor = ({ value, onSave, className = "", isEditMode, placeholder = "Click to edit..." }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const editorRef = useRef(null)
  const modalRef = useRef(null)
  const [currentFontSize, setCurrentFontSize] = useState('16')
  const [showFontPicker, setShowFontPicker] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [fontSearchTerm, setFontSearchTerm] = useState('')
  const [colorSearchTerm, setColorSearchTerm] = useState('')
  const [customColor, setCustomColor] = useState('#000000')
  const fontSearchTimeout = useRef(null)
  const colorSearchTimeout = useRef(null)

  // Comprehensive font list
  const allFonts = [
    // System Fonts
    'Arial', 'Arial Black', 'Bahnschrift', 'Calibri', 'Cambria', 'Cambria Math',
    'Candara', 'Comic Sans MS', 'Consolas', 'Constantia', 'Corbel', 'Courier New',
    'Ebrima', 'Franklin Gothic Medium', 'Gabriola', 'Gadugi', 'Georgia', 'Gill Sans MT',
    'Helvetica', 'Helvetica Neue', 'Impact', 'Ink Free', 'Javanese Text', 'Leelawadee UI',
    'Lucida Console', 'Lucida Sans', 'Lucida Sans Unicode', 'Malgun Gothic', 'Marlett',
    'Microsoft Himalaya', 'Microsoft JhengHei', 'Microsoft New Tai Lue', 'Microsoft PhagsPa',
    'Microsoft Sans Serif', 'Microsoft Tai Le', 'Microsoft YaHei', 'Microsoft Yi Baiti',
    'MingLiU', 'MingLiU-ExtB', 'Mongolian Baiti', 'MS Gothic', 'MS PGothic', 'MS UI Gothic',
    'MV Boli', 'Myanmar Text', 'Nirmala UI', 'Palatino Linotype', 'Segoe MDL2 Assets',
    'Segoe Print', 'Segoe Script', 'Segoe UI', 'Segoe UI Emoji', 'Segoe UI Historic',
    'Segoe UI Symbol', 'SimHei', 'Simplified Arabic', 'Simplified Arabic Fixed',
    'SimSun', 'SimSun-ExtB', 'Sitka Banner', 'Sitka Display', 'Sitka Heading',
    'Sitka Small', 'Sitka Subheading', 'Sitka Text', 'Sylfaen', 'Symbol', 'Tahoma',
    'Times New Roman', 'Trebuchet MS', 'Verdana', 'Webdings', 'Wingdings', 'Wingdings 2',
    'Wingdings 3', 'Yu Gothic',
    
    // Google Fonts - Popular
    'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Raleway', 'Oswald',
    'Ubuntu', 'Nunito', 'Quicksand', 'Source Sans Pro', 'Merriweather', 'Playfair Display',
    'Dancing Script', 'Pacifico', 'Shadows Into Light', 'Indie Flower', 'Amatic SC',
    'Cabin', 'Muli', 'Maven Pro', 'Abel', 'Abril Fatface', 'Acme', 'Akronim',
    'Aladin', 'Aldrich', 'Alegreya', 'Alegreya Sans', 'Alex Brush', 'Alfa Slab One',
    'Alice', 'Alike', 'Alike Angular', 'Allan', 'Allerta', 'Allerta Stencil',
    'Allura', 'Almendra', 'Almendra Display', 'Almendra SC', 'Amarante', 'Amaranth',
    'Amatic SC', 'Amethysta', 'Amiko', 'Amiri', 'Amita', 'Anaheim', 'Andada',
    'Andika', 'Angkor', 'Annie Use Your Telescope', 'Anonymous Pro', 'Antic',
    'Antic Didone', 'Antic Slab', 'Anton', 'Arapey', 'Arbutus', 'Arbutus Slab',
    'Architects Daughter', 'Archivo', 'Archivo Black', 'Archivo Narrow', 'Aref Ruqaa',
    'Arima Madurai', 'Arimo', 'Arizonia', 'Armata', 'Arsenal', 'Artifika', 'Arvo',
    'Arya', 'Asap', 'Asap Condensed', 'Asar', 'Asset', 'Assistant', 'Astloch',
    'Asul', 'Athiti', 'Atma', 'Atomic Age', 'Aubrey', 'Audiowide', 'Autour One',
    'Average', 'Average Sans', 'Averia Gruesa Libre', 'Averia Libre', 'Averia Sans Libre',
    'Averia Serif Libre', 'B612', 'B612 Mono', 'Bad Script', 'Bahiana', 'Bahianita',
    'Bai Jamjuree', 'Baloo', 'Baloo Bhai', 'Baloo Bhaijaan', 'Baloo Bhaina',
    'Baloo Chettan', 'Baloo Da', 'Baloo Paaji', 'Baloo Tamma', 'Baloo Tammudu',
    'Baloo Thambi', 'Balsamiq Sans', 'Balthazar', 'Bangers', 'Barlow', 'Barlow Condensed',
    'Barlow Semi Condensed', 'Barriecito', 'Barrio', 'Basic', 'Battambang', 'Baumans',
    'Bayon', 'Be Vietnam', 'Bebas Neue', 'Belgrano', 'Bellefair', 'Belleza',
    'BenchNine', 'Bentham', 'Berkshire Swash', 'Beth Ellen', 'Bevan', 'Big Shoulders Display',
    'Big Shoulders Text', 'Bigelow Rules', 'Bigshot One', 'Bilbo', 'Bilbo Swash Caps',
    'BioRhyme', 'BioRhyme Expanded', 'Biryani', 'Bitter', 'Black And White Picture',
    'Black Han Sans', 'Black Ops One', 'Bokor', 'Bonbon', 'Boogaloo', 'Bowlby One',
    'Bowlby One SC', 'Brawler', 'Bree Serif', 'Bubblegum Sans', 'Bubbler One',
    'Buda', 'Buenard', 'Bungee', 'Bungee Hairline', 'Bungee Inline', 'Bungee Outline',
    'Bungee Shade', 'Butcherman', 'Butterfly Kids', 'Cabin', 'Cabin Condensed',
    'Cabin Sketch', 'Caesar Dressing', 'Cagliostro', 'Cairo', 'Caladea', 'Calistoga',
    'Calligraffitti', 'Cambay', 'Cambo', 'Candal', 'Cantarell', 'Cantata One',
    'Cantora One', 'Capriola', 'Cardo', 'Carme', 'Carrois Gothic', 'Carrois Gothic SC',
    'Carter One', 'Catamaran', 'Caudex', 'Caveat', 'Caveat Brush', 'Cedarville Cursive',
    'Ceviche One', 'Chakra Petch', 'Changa', 'Changa One', 'Chango', 'Charm',
    'Charmonman', 'Chathura', 'Chau Philomene One', 'Chela One', 'Chelsea Market',
    'Chenla', 'Cherry Cream Soda', 'Cherry Swash', 'Chewy', 'Chicle', 'Chivo',
    'Chonburi', 'Cinzel', 'Cinzel Decorative', 'Clicker Script', 'Coda', 'Coda Caption',
    'Codystar', 'Coiny', 'Combo', 'Comfortaa', 'Comic Neue', 'Coming Soon',
    'Concert One', 'Condiment', 'Content', 'Contrail One', 'Convergence', 'Cookie',
    'Copse', 'Corben', 'Cormorant', 'Cormorant Garamond', 'Cormorant Infant',
    'Cormorant SC', 'Cormorant Unicase', 'Cormorant Upright', 'Courgette',
    'Cousine', 'Coustard', 'Covered By Your Grace', 'Crafty Girls', 'Creepster',
    'Crete Round', 'Crimson Text', 'Croissant One', 'Crushed', 'Cuprum', 'Cute Font',
    'Cutive', 'Cutive Mono', 'DM Sans', 'DM Serif Display', 'DM Serif Text',
    'Damion', 'Dancing Script', 'Dangrek', 'Darker Grotesque', 'David Libre',
    'Dawning of a New Day', 'Days One', 'Dekko', 'Delius', 'Delius Swash Caps',
    'Delius Unicase', 'Della Respira', 'Denk One', 'Devonshire', 'Dhurjati',
    'Didact Gothic', 'Digory Doodles', 'Diphylleia', 'Diplomata', 'Diplomata SC',
    'Do Hyeon', 'Dokdo', 'Domine', 'Donegal One', 'Doppio One', 'Dorsa',
    'Dosis', 'Dr Sugiyama', 'Droid Sans', 'Droid Sans Mono', 'Droid Serif',
    'Duru Sans', 'Dynalight', 'EB Garamond', 'Eagle Lake', 'East Sea Dokdo',
    'Eater', 'Economica', 'Eczar', 'El Messiri', 'Electrolize', 'Elsie',
    'Elsie Swash Caps', 'Emblema One', 'Emilys Candy', 'Encode Sans',
    'Encode Sans Condensed', 'Encode Sans Expanded', 'Encode Sans Semi Condensed',
    'Encode Sans Semi Expanded', 'Engagement', 'Englebert', 'Enriqueta',
    'Erica One', 'Esteban', 'Euphoria Script', 'Ewert', 'Exo', 'Exo 2',
    'Expletus Sans', 'Fahkwang', 'Fanwood Text', 'Farsan', 'Fascinate',
    'Fascinate Inline', 'Faster One', 'Fasthand', 'Fauna One', 'Faustina',
    'Federant', 'Federo', 'Felipa', 'Fenix', 'Finger Paint', 'Fira Mono',
    'Fira Sans', 'Fira Sans Condensed', 'Fira Sans Extra Condensed', 'Fjalla One',
    'Fjord One', 'Flamenco', 'Flavors', 'Fondamento', 'Fontdiner Swanky',
    'Forum', 'Francois One', 'Frank Ruhl Libre', 'Freckle Face', 'Fredericka the Great',
    'Fredoka One', 'Freehand', 'Fresca', 'Frijole', 'Fruktur', 'Fugaz One',
    'GFS Didot', 'GFS Neohellenic', 'Gabriela', 'Gaegu', 'Gafata', 'Galada',
    'Galdeano', 'Galindo', 'Gamja Flower', 'Gayathri', 'Gelasio', 'Gentium Basic',
    'Gentium Book Basic', 'Geo', 'Geostar', 'Geostar Fill', 'Germania One',
    'Gidugu', 'Gilda Display', 'Girassol', 'Give You Glory', 'Glass Antiqua',
    'Glegoo', 'Gloria Hallelujah', 'Gochi Hand', 'Gorditas', 'Gothic A1',
    'Goudy Bookletter 1911', 'Graduate', 'Grand Hotel', 'Gravitas One',
    'Great Vibes', 'Griffy', 'Gruppo', 'Gudea', 'Gugi', 'Gurajada', 'Habibi',
    'Halant', 'Hammersmith One', 'Hanalei', 'Hanalei Fill', 'Handlee',
    'Hanuman', 'Happy Monkey', 'Harmattan', 'Headland One', 'Heebo',
    'Henny Penny', 'Herr Von Muellerhoff', 'Hi Melody', 'Hind', 'Hind Guntur',
    'Hind Madurai', 'Hind Siliguri', 'Hind Vadodara', 'Holtwood One SC',
    'Homemade Apple', 'Homenaje', 'IBM Plex Mono', 'IBM Plex Sans',
    'IBM Plex Sans Condensed', 'IBM Plex Serif', 'IM Fell DW Pica',
    'IM Fell DW Pica SC', 'IM Fell Double Pica', 'IM Fell Double Pica SC',
    'IM Fell English', 'IM Fell English SC', 'IM Fell French Canon',
    'IM Fell French Canon SC', 'IM Fell Great Primer', 'IM Fell Great Primer SC',
    'Iceberg', 'Iceland', 'Imprima', 'Inconsolata', 'Inder', 'Indie Flower',
    'Inika', 'Inknut Antiqua', 'Inria Sans', 'Inria Serif', 'Inter',
    'Irish Grover', 'Istok Web', 'Italiana', 'Italianno', 'Itim',
    'Jacques Francois', 'Jacques Francois Shadow', 'Jaldi', 'Jim Nightshade',
    'Jockey One', 'Jolly Lodger', 'Jomhuria', 'Jomolhari', 'Josefin Sans',
    'Josefin Slab', 'Jost', 'Joti One', 'Jua', 'Judson', 'Julee', 'Julius Sans One',
    'Junge', 'Jura', 'Just Another Hand', 'Just Me Again Down Here',
    'K2D', 'Kadwa', 'Kalam', 'Kameron', 'Kanit', 'Kantumruy', 'Karla',
    'Karma', 'Katibeh', 'Kaushan Script', 'Kavivanar', 'Kavoon', 'Kdam Thmor',
    'Keania One', 'Kelly Slab', 'Kenia', 'Khand', 'Khmer', 'Khula', 'Kirang Haerang',
    'Kite One', 'Knewave', 'KoHo', 'Kodchasan', 'Kosugi', 'Kosugi Maru',
    'Kotta One', 'Koulen', 'Kranky', 'Kreon', 'Kristi', 'Krona One',
    'Krub', 'Kumar One', 'Kumar One Outline', 'Kurale', 'La Belle Aurore',
    'Lacquer', 'Laila', 'Lakki Reddy', 'Lalezar', 'Lancelot', 'Lateef',
    'Lato', 'League Script', 'Leckerli One', 'Ledger', 'Lekton', 'Lemon',
    'Lemonada', 'Lexend Deca', 'Lexend Exa', 'Lexend Giga', 'Lexend Mega',
    'Lexend Peta', 'Lexend Tera', 'Lexend Zetta', 'Libre Barcode 128',
    'Libre Barcode 128 Text', 'Libre Barcode 39', 'Libre Barcode 39 Extended',
    'Libre Barcode 39 Extended Text', 'Libre Barcode 39 Text', 'Libre Baskerville',
    'Libre Franklin', 'Life Savers', 'Lilita One', 'Lily Script One',
    'Limelight', 'Linden Hill', 'Literata', 'Liu Jian Mao Cao', 'Livvic',
    'Lobster', 'Lobster Two', 'Londrina Outline', 'Londrina Shadow',
    'Londrina Sketch', 'Londrina Solid', 'Long Cang', 'Lora', 'Love Ya Like A Sister',
    'Loved by the King', 'Lovers Quarrel', 'Luckiest Guy', 'Lusitana',
    'Lustria', 'M PLUS 1p', 'M PLUS Rounded 1c', 'Ma Shan Zheng', 'Macondo',
    'Macondo Swash Caps', 'Mada', 'Magra', 'Maiden Orange', 'Maitree',
    'Major Mono Display', 'Mako', 'Mali', 'Mallanna', 'Mandali', 'Manjari',
    'Mansalva', 'Manuale', 'Marcellus', 'Marcellus SC', 'Marck Script',
    'Margarine', 'Markazi Text', 'Marko One', 'Marmelad', 'Martel',
    'Martel Sans', 'Marvel', 'Mate', 'Mate SC', 'Maven Pro', 'McLaren',
    'Meddon', 'MedievalSharp', 'Medula One', 'Meera Inimai', 'Megrim',
    'Meie Script', 'Merienda', 'Merienda One', 'Merriweather', 'Merriweather Sans',
    'Metal', 'Metal Mania', 'Metamorphous', 'Metrophobic', 'Michroma',
    'Milonga', 'Miltonian', 'Miltonian Tattoo', 'Mina', 'Miniver',
    'Miriam Libre', 'Mirza', 'Miss Fajardose', 'Mitr', 'Modak',
    'Modern Antiqua', 'Mogra', 'Molengo', 'Molle', 'Monda', 'Monofett',
    'Monoton', 'Monsieur La Doulaise', 'Montaga', 'Montez', 'Montserrat',
    'Montserrat Alternates', 'Montserrat Subrayada', 'Moul', 'Moulpali',
    'Mountains of Christmas', 'Mouse Memoirs', 'Mr Bedfort', 'Mr Dafoe',
    'Mr De Haviland', 'Mrs Saint Delafield', 'Mrs Sheppards', 'Mukta',
    'Mukta Mahee', 'Mukta Malar', 'Mukta Vaani', 'Muli', 'Mystery Quest',
    'NTR', 'Nanum Brush Script', 'Nanum Gothic', 'Nanum Gothic Coding',
    'Nanum Myeongjo', 'Nanum Pen Script', 'Neucha', 'Neuton', 'New Rocker',
    'News Cycle', 'Niconne', 'Niramit', 'Nixie One', 'Nobile', 'Nokora',
    'Norican', 'Nosifer', 'Notable', 'Nothing You Could Do', 'Noticia Text',
    'Noto Sans', 'Noto Sans HK', 'Noto Sans JP', 'Noto Sans KR', 'Noto Sans SC',
    'Noto Sans TC', 'Noto Serif', 'Noto Serif JP', 'Noto Serif KR', 'Noto Serif SC',
    'Noto Serif TC', 'Nova Cut', 'Nova Flat', 'Nova Mono', 'Nova Oval',
    'Nova Round', 'Nova Script', 'Nova Slim', 'Nova Square', 'Numans',
    'Nunito', 'Nunito Sans', 'Odor Mean Chey', 'Offside', 'Old Standard TT',
    'Oldenburg', 'Oleo Script', 'Oleo Script Swash Caps', 'Open Sans',
    'Open Sans Condensed', 'Oranienbaum', 'Orbitron', 'Oregano', 'Orienta',
    'Original Surfer', 'Oswald', 'Over the Rainbow', 'Overlock', 'Overlock SC',
    'Overpass', 'Overpass Mono', 'Ovo', 'Oxanium', 'Oxygen', 'Oxygen Mono',
    'PT Mono', 'PT Sans', 'PT Sans Caption', 'PT Sans Narrow', 'PT Serif',
    'PT Serif Caption', 'Pacifico', 'Padauk', 'Palanquin', 'Palanquin Dark',
    'Pangolin', 'Paprika', 'Parisienne', 'Passero One', 'Passion One',
    'Pathway Gothic One', 'Patrick Hand', 'Patrick Hand SC', 'Pattaya',
    'Patua One', 'Pavanam', 'Paytone One', 'Peddana', 'Peralta',
    'Permanent Marker', 'Petit Formal Script', 'Petrona', 'Philosopher',
    'Piedra', 'Pinyon Script', 'Pirata One', 'Plaster', 'Play', 'Playball',
    'Playfair Display', 'Playfair Display SC', 'Podkova', 'Poiret One',
    'Poller One', 'Poly', 'Pompiere', 'Pontano Sans', 'Poor Story',
    'Poppins', 'Port Lligat Sans', 'Port Lligat Slab', 'Pragati Narrow',
    'Prata', 'Preahvihear', 'Press Start 2P', 'Pridi', 'Princess Sofia',
    'Prociono', 'Prompt', 'Prosto One', 'Proza Libre', 'Public Sans',
    'Puritan', 'Purple Purse', 'Quando', 'Quantico', 'Quattrocento',
    'Quattrocento Sans', 'Questrial', 'Quicksand', 'Quintessential',
    'Qwigley', 'Racing Sans One', 'Radley', 'Rajdhani', 'Rakkas',
    'Raleway', 'Raleway Dots', 'Ramabhadra', 'Ramaraja', 'Rambla',
    'Rammetto One', 'Ranchers', 'Rancho', 'Ranga', 'Rasa', 'Rationale',
    'Ravi Prakash', 'Red Hat Display', 'Red Hat Text', 'Redressed',
    'Reem Kufi', 'Reenie Beanie', 'Revalia', 'Rhodium Libre', 'Ribeye',
    'Ribeye Marrow', 'Righteous', 'Risque', 'Roboto', 'Roboto Condensed',
    'Roboto Mono', 'Roboto Slab', 'Rochester', 'Rock Salt', 'Rokkitt',
    'Romanesco', 'Ropa Sans', 'Rosario', 'Rosarivo', 'Rouge Script',
    'Rozha One', 'Rubik', 'Rubik Mono One', 'Ruda', 'Rufina', 'Ruge Boogie',
    'Ruluko', 'Rum Raisin', 'Ruslan Display', 'Russo One', 'Ruthie',
    'Rye', 'Sacramento', 'Sahitya', 'Sail', 'Saira', 'Saira Condensed',
    'Saira Extra Condensed', 'Saira Semi Condensed', 'Saira Stencil One',
    'Salsa', 'Sanchez', 'Sancreek', 'Sansita', 'Sansita One', 'Sarabun',
    'Sarala', 'Sarina', 'Sarpanch', 'Satisfy', 'Sawarabi Gothic',
    'Sawarabi Mincho', 'Scada', 'Scheherazade', 'Schoolbell', 'Scope One',
    'Seaweed Script', 'Secular One', 'Sedgwick Ave', 'Sedgwick Ave Display',
    'Sen', 'Sevillana', 'Seymour One', 'Shadows Into Light', 'Shadows Into Light Two',
    'Shanti', 'Share', 'Share Tech', 'Share Tech Mono', 'Shojumaru',
    'Short Stack', 'Shrikhand', 'Siemreap', 'Sigmar One', 'Signika',
    'Signika Negative', 'Simonetta', 'Sintony', 'Sirin Stencil',
    'Six Caps', 'Skranji', 'Slabo 13px', 'Slabo 27px', 'Slackey',
    'Smokum', 'Smythe', 'Sniglet', 'Snippet', 'Snowburst One',
    'Sofadi One', 'Sofia', 'Solway', 'Song Myung', 'Sonsie One',
    'Sorts Mill Goudy', 'Source Code Pro', 'Source Sans Pro',
    'Source Serif Pro', 'Space Mono', 'Special Elite', 'Spectral',
    'Spectral SC', 'Spicy Rice', 'Spinnaker', 'Spirax', 'Squada One',
    'Sree Krushnadevaraya', 'Sriracha', 'Srisakdi', 'Staatliches',
    'Stalemate', 'Stalinist One', 'Stardos Stencil', 'Stint Ultra Condensed',
    'Stint Ultra Expanded', 'Stoke', 'Strait', 'Stylish', 'Sue Ellen Francisco',
    'Suez One', 'Sumana', 'Sunflower', 'Sunshiney', 'Supermercado One',
    'Sura', 'Suranna', 'Suravaram', 'Suwannaphum', 'Swanky and Moo Moo',
    'Syncopate', 'Tajawal', 'Tangerine', 'Taprom', 'Tauri', 'Taviraj',
    'Teko', 'Telex', 'Tenali Ramakrishna', 'Tenor Sans', 'Text Me One',
    'Thasadith', 'The Girl Next Door', 'Tienne', 'Tillana', 'Timmana',
    'Tinos', 'Titan One', 'Titillium Web', 'Trade Winds', 'Trirong',
    'Trocchi', 'Trochut', 'Trykker', 'Tulpen One', 'Turret Road',
    'Ubuntu', 'Ubuntu Condensed', 'Ubuntu Mono', 'Ultra', 'Uncial Antiqua',
    'Underdog', 'Unica One', 'UnifrakturCook', 'UnifrakturMaguntia',
    'Unkempt', 'Unlock', 'Unna', 'VT323', 'Vampiro One', 'Varela',
    'Varela Round', 'Vast Shadow', 'Vesper Libre', 'Viaoda Libre',
    'Vibes', 'Vibur', 'Vidaloka', 'Viga', 'Voces', 'Volkhov', 'Vollkorn',
    'Vollkorn SC', 'Voltaire', 'Waiting for the Sunrise', 'Wallpoet',
    'Walter Turncoat', 'Warnes', 'Wellfleet', 'Wendy One', 'Wire One',
    'Work Sans', 'Yanone Kaffeesatz', 'Yantramanav', 'Yatra One',
    'Yellowtail', 'Yeon Sung', 'Yeseva One', 'Yesteryear', 'Yrsa',
    'ZCOOL KuaiLe', 'ZCOOL QingKe HuangYou', 'ZCOOL XiaoWei', 'Zeyada',
    'Zhi Mang Xing', 'Zilla Slab', 'Zilla Slab Highlight'
  ].sort();

  useEffect(() => {
    if (isEditing && editorRef.current) {
      editorRef.current.focus()
      const range = document.createRange()
      const sel = window.getSelection()
      range.selectNodeContents(editorRef.current)
      range.collapse(false)
      sel.removeAllRanges()
      sel.addRange(range)
    }
  }, [isEditing])

  // IMPROVED: Modal click handler - only closes when clicking the overlay
  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsEditing(false)
    }
  }

  const handleSave = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML
      onSave(content)
    }
    setIsEditing(false)
  }

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value)
    editorRef.current.focus()
  }

  const handleFontSize = (px) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    
    const span = document.createElement('span');
    span.style.fontSize = `${px}px`;
    span.style.display = 'inline';
    
    if (range.collapsed) {
      span.innerHTML = ' ';
      range.insertNode(span);
      
      const newRange = document.createRange();
      newRange.selectNodeContents(span);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else {
      try {
        const selectedContent = range.extractContents();
        span.appendChild(selectedContent);
        range.insertNode(span);
        
        const newRange = document.createRange();
        newRange.selectNodeContents(span);
        selection.removeAllRanges();
        selection.addRange(newRange);
      } catch (e) {
        console.log('Error applying font size:', e);
      }
    }
    
    setCurrentFontSize(px.toString());
    
    if (editorRef.current) {
      setEditValue(editorRef.current.innerHTML);
    }
    
    editorRef.current.focus();
  }

  const handleFontFamily = (font) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    
    if (range.collapsed) {
      setShowFontPicker(false);
      return;
    }
    
    const span = document.createElement('span');
    span.style.fontFamily = font;
    
    try {
      const selectedContent = range.extractContents();
      span.appendChild(selectedContent);
      range.insertNode(span);
      
      const newRange = document.createRange();
      newRange.selectNodeContents(span);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } catch (e) {
      console.log('Error applying font family:', e);
    }
    
    if (editorRef.current) {
      setEditValue(editorRef.current.innerHTML);
    }
    
    setShowFontPicker(false);
    setFontSearchTerm('');
    editorRef.current.focus();
  }

  const handleColorChange = (color) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    
    if (range.collapsed) {
      setShowColorPicker(false);
      return;
    }
    
    const span = document.createElement('span');
    span.style.color = color;
    
    try {
      const selectedContent = range.extractContents();
      span.appendChild(selectedContent);
      range.insertNode(span);
      
      const newRange = document.createRange();
      newRange.selectNodeContents(span);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } catch (e) {
      console.log('Error applying color:', e);
    }
    
    if (editorRef.current) {
      setEditValue(editorRef.current.innerHTML);
    }
    
    setShowColorPicker(false);
    setColorSearchTerm('');
    editorRef.current.focus();
  }

  const handleCustomColor = () => {
    const input = document.createElement('input');
    input.type = 'color';
    input.value = customColor;
    input.onchange = (e) => {
      setCustomColor(e.target.value);
      handleColorChange(e.target.value);
    };
    input.click();
  }

  const handleTextAlign = (align) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    
    const range = selection.getRangeAt(0);
    if (range.collapsed) {
      return;
    }
    
    document.execCommand('justify' + align, false, null);
    setTimeout(() => {
      if (editorRef.current) {
        setEditValue(editorRef.current.innerHTML);
      }
    }, 10);
    editorRef.current.focus();
  }

  const insertList = (type) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    
    const range = selection.getRangeAt(0);
    if (range.collapsed) {
      return;
    }
    
    document.execCommand('insert' + (type === 'ul' ? 'UnorderedList' : 'OrderedList'), false, null);
    setTimeout(() => {
      if (editorRef.current) {
        setEditValue(editorRef.current.innerHTML);
      }
    }, 10);
    editorRef.current.focus();
  }

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    }
    if (e.key === 'Escape') {
      setIsEditing(false)
    }
  }

  // IMPROVED: Debounced font search to prevent freezing
  const handleFontSearchChange = (e) => {
    const value = e.target.value;
    if (fontSearchTimeout.current) {
      clearTimeout(fontSearchTimeout.current);
    }
    fontSearchTimeout.current = setTimeout(() => {
      setFontSearchTerm(value);
    }, 150);
  };

  // IMPROVED: Debounced color search to prevent freezing
  const handleColorSearchChange = (e) => {
    const value = e.target.value;
    if (colorSearchTimeout.current) {
      clearTimeout(colorSearchTimeout.current);
    }
    colorSearchTimeout.current = setTimeout(() => {
      setColorSearchTerm(value);
    }, 150);
  };

  // Filter fonts based on search (memoized for performance)
  const filteredFonts = useMemo(() => {
    return fontSearchTerm 
      ? allFonts.filter(font => 
          font.toLowerCase().includes(fontSearchTerm.toLowerCase())
        )
      : allFonts;
  }, [fontSearchTerm]);

  // Filter colors based on search (memoized for performance)
  const filteredColors = useMemo(() => {
    return colorSearchTerm
      ? colors.filter(color => 
          color.name.toLowerCase().includes(colorSearchTerm.toLowerCase()) ||
          color.value.toLowerCase().includes(colorSearchTerm.toLowerCase())
        )
      : colors;
  }, [colorSearchTerm]);

  if (isEditing && isEditMode) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={handleModalClick}>
        <div 
          ref={modalRef}
          className="relative w-full max-w-4xl mx-4 border-2 border-[#EAB308] rounded-lg overflow-hidden bg-theme-primary shadow-2xl" 
          onClick={(e) => e.stopPropagation()}
        >
          {/* MS Word Style Toolbar with Search */}
          <div className="bg-theme-secondary border-b border-theme p-2 flex flex-wrap gap-1 sticky top-0 z-10">
            {/* Font Family with Search */}
            <div className="relative">
              <button
                onClick={() => setShowFontPicker(!showFontPicker)}
                className="h-8 px-3 text-sm bg-theme-primary border border-theme rounded text-theme-primary min-w-[140px] flex items-center justify-between gap-2 hover:bg-[#EAB308]/10"
              >
                <span className="truncate">Font Family</span>
                <ChevronDownIcon size={14} />
              </button>
              
              {showFontPicker && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-theme-primary border border-theme rounded-lg shadow-xl z-20 max-h-96 overflow-hidden flex flex-col">
                  <div className="p-2 border-b border-theme">
                    <div className="relative">
                      <Search size={14} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-theme-secondary" />
                      <input
                        type="text"
                        onChange={handleFontSearchChange}
                        placeholder="Search 1000+ fonts..."
                        className="w-full pl-8 pr-3 py-2 text-sm bg-theme-secondary border border-theme rounded text-theme-primary"
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  <div className="overflow-y-auto flex-1 p-1">
                    {filteredFonts.map(font => (
                      <button
                        key={font}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFontFamily(font);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-[#EAB308]/10 rounded text-sm"
                        style={{ fontFamily: font }}
                      >
                        {font}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Font Size */}
            <div className="relative">
              <select
                onChange={(e) => handleFontSize(parseInt(e.target.value))}
                value={currentFontSize}
                className="h-8 px-2 text-sm bg-theme-primary border border-theme rounded text-theme-primary w-24"
                title="Font Size"
                onClick={(e) => e.stopPropagation()}
              >
                {[8,9,10,11,12,14,16,18,20,22,24,26,28,32,36,40,44,48,52,56,60,64,68,72,80,88,96].map(px => (
                  <option key={px} value={px}>{px}px</option>
                ))}
              </select>
            </div>

            <div className="w-px h-6 bg-theme mx-1 self-center" />

            {/* Text Formatting */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                execCommand('bold');
              }}
              className="p-1.5 rounded hover:bg-[#EAB308]/20 text-theme-primary min-w-[32px]"
              title="Bold (Ctrl+B)"
            >
              <Bold size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                execCommand('italic');
              }}
              className="p-1.5 rounded hover:bg-[#EAB308]/20 text-theme-primary min-w-[32px]"
              title="Italic (Ctrl+I)"
            >
              <Italic size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                execCommand('underline');
              }}
              className="p-1.5 rounded hover:bg-[#EAB308]/20 text-theme-primary min-w-[32px]"
              title="Underline (Ctrl+U)"
            >
              <Underline size={18} />
            </button>

            {/* Color Picker with Search */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowColorPicker(!showColorPicker);
                }}
                className="p-1.5 rounded hover:bg-[#EAB308]/20 text-theme-primary min-w-[32px] relative"
                title="Text Color"
              >
                <Palette size={18} />
              </button>
              
              {showColorPicker && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-theme-primary border border-theme rounded-lg shadow-xl z-20 max-h-96 overflow-hidden flex flex-col">
                  <div className="p-2 border-b border-theme">
                    <div className="relative">
                      <Search size={14} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-theme-secondary" />
                      <input
                        type="text"
                        onChange={handleColorSearchChange}
                        placeholder="Search 150+ colors..."
                        className="w-full pl-8 pr-3 py-2 text-sm bg-theme-secondary border border-theme rounded text-theme-primary"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  <div className="overflow-y-auto flex-1 p-2">
                    <div className="mb-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCustomColor();
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-[#EAB308]/10 rounded text-sm flex items-center gap-2 border border-theme"
                      >
                        <div className="w-5 h-5 rounded" style={{ backgroundColor: customColor }} />
                        <span>Custom Color...</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-6 gap-1">
                      {filteredColors.map((color, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleColorChange(color.value);
                          }}
                          className="w-8 h-8 rounded border border-theme hover:scale-110 transition-transform relative group"
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        >
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-theme-primary border border-theme rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-30">
                            {color.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="w-px h-6 bg-theme mx-1 self-center" />

            {/* Alignment */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleTextAlign('Left');
              }}
              className="p-1.5 rounded hover:bg-[#EAB308]/20 text-theme-primary min-w-[32px]"
              title="Align Left"
            >
              <AlignLeft size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleTextAlign('Center');
              }}
              className="p-1.5 rounded hover:bg-[#EAB308]/20 text-theme-primary min-w-[32px]"
              title="Align Center"
            >
              <AlignCenter size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleTextAlign('Right');
              }}
              className="p-1.5 rounded hover:bg-[#EAB308]/20 text-theme-primary min-w-[32px]"
              title="Align Right"
            >
              <AlignRight size={18} />
            </button>

            <div className="w-px h-6 bg-theme mx-1 self-center" />

            {/* Lists */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                insertList('ul');
              }}
              className="p-1.5 rounded hover:bg-[#EAB308]/20 text-theme-primary min-w-[32px]"
              title="Bullet List"
            >
              <List size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                insertList('ol');
              }}
              className="p-1.5 rounded hover:bg-[#EAB308]/20 text-theme-primary min-w-[32px]"
              title="Numbered List"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 6h11M10 12h11M10 18h11M4 6h1v4M4 10h1M4 18h1v-3M4 15h1" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="flex-1" />

            {/* Save Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
              className="px-3 py-1.5 bg-[#EAB308] text-black rounded hover:bg-[#EAB308]/90 text-sm font-medium flex items-center gap-1"
            >
              <Save size={16} /> Save (Ctrl+Enter)
            </button>
          </div>

          {/* Editable Content Area */}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            className={`p-4 min-h-[200px] max-h-[500px] overflow-y-auto outline-none text-theme-primary bg-theme-primary ${className}`}
            style={{
              fontFamily: 'inherit',
              lineHeight: '1.6'
            }}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            onMouseUp={() => {
              const selection = window.getSelection();
              if (selection.rangeCount > 0 && !selection.getRangeAt(0).collapsed) {
                const node = selection.getRangeAt(0).startContainer.parentElement;
                if (node && node.style && node.style.fontSize) {
                  setCurrentFontSize(parseInt(node.style.fontSize));
                }
              }
            }}
            dangerouslySetInnerHTML={{ __html: editValue || '' }}
          />

          {/* Hint */}
          <div className="absolute bottom-2 right-2 text-xs text-theme-secondary opacity-50">
            Ctrl+Enter to save • Escape to cancel
          </div>
        </div>
      </div>
    )
  }

return (
    <div className="relative group min-w-[2em] min-h-[1.5em]">
      <div
        className={`${className} ${isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-[#EAB308]/30 rounded-lg transition-all' : ''}`}
        onClick={() => isEditMode && setIsEditing(true)}
      >
        {value && value !== '<br>' && value !== '&nbsp;' && value !== ' ' && value.trim() !== '' ? (
          <span dangerouslySetInnerHTML={{ __html: value }} />
        ) : (
          <span className="text-theme-secondary opacity-50 italic border border-dashed border-[#EAB308]/30 px-2 py-1 rounded inline-block min-w-[4em]">
            {placeholder}
          </span>
        )}
      </div>
    </div>
  )
}

// Gallery Section Component
const GallerySection = ({
  id,
  categoryId,
  images,
  title,
  subtitle,
  onImageClick,
  isEditMode,
  onUpload,
  onDelete,
  onTitleEdit,
  onSubtitleEdit,
  onMoveUp,
  onMoveDown,
  onDeleteSection,
  showMoveUp,
  showMoveDown
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mainImageLoaded, setMainImageLoaded] = useState(false)
  const [thumbnailsLoaded, setThumbnailsLoaded] = useState({})
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const autoPlayRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (images.length <= 1 || !isAutoPlaying) return

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
      setMainImageLoaded(false)
    }, 5000)

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [images.length, isAutoPlaying])

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setIsUploading(true)
      const data = await uploadToCloudinary(file, categoryId);
      if (data) onUpload(data)
      setIsUploading(false)
    }
  }

  const selectImage = (index) => {
    setCurrentIndex(index)
    setMainImageLoaded(false)
  }

  const nextImage = () => {
    if (images.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setMainImageLoaded(false)
  }

  const prevImage = () => {
    if (images.length === 0) return
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setMainImageLoaded(false)
  }

  const handleThumbnailLoad = (index) => {
    setThumbnailsLoaded(prev => ({ ...prev, [index]: true }))
  }

  const getFlexClasses = () => {
    const count = images.length
    return 'flex flex-wrap justify-center gap-3'
  }

  const getThumbnailWidth = () => {
    const count = images.length
    if (count === 1) return 'w-full max-w-[200px]'
    if (count === 2) return 'w-[calc(50%-6px)] max-w-[150px]'
    if (count === 3) return 'w-[calc(33.333%-8px)] max-w-[120px]'
    if (count === 4) return 'w-[calc(50%-6px)] sm:w-[calc(25%-9px)] max-w-[120px]'
    if (count === 5) return 'w-[calc(50%-6px)] sm:w-[calc(33.333%-8px)] lg:w-[calc(20%-10px)] max-w-[120px]'
    if (count === 6) return 'w-[calc(50%-6px)] sm:w-[calc(33.333%-8px)] lg:w-[calc(16.666%-10px)] max-w-[120px]'
    return 'w-[calc(50%-6px)] sm:w-[calc(33.333%-8px)] lg:w-[calc(25%-9px)] max-w-[120px]'
  }

  return (
    <div className="mb-32 relative group/section">
      {isEditMode && (
        <div className="absolute -top-12 right-0 flex gap-2">
          {showMoveUp && (
            <button
              onClick={onMoveUp}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              title="Move section up"
            >
              <ChevronUp size={16} />
            </button>
          )}
          {showMoveDown && (
            <button
              onClick={onMoveDown}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              title="Move section down"
            >
              <ChevronDown size={16} />
            </button>
          )}
          <button
            onClick={onDeleteSection}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            title="Delete section"
          >
            <Trash size={16} />
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div className="flex-1">
          <RichTextEditor
            value={title}
            onSave={onTitleEdit}
            isEditMode={isEditMode}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-theme-primary"
            placeholder="Section Title"
          />
          {subtitle && (
            <RichTextEditor
              value={subtitle}
              onSave={onSubtitleEdit}
              isEditMode={isEditMode}
              className="mt-4 text-theme-secondary text-lg max-w-2xl"
              placeholder="Section Subtitle"
            />
          )}
          <div className="h-[2px] w-24 bg-[#EAB308] mt-6" />
        </div>

        {isEditMode && (
          <div className="flex gap-3">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,.svg" />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-2 px-6 py-3 bg-[#EAB308] text-black rounded-full font-bold hover:scale-105 transition-all disabled:opacity-50 shadow-lg"
            >
              {isUploading ? <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <Upload size={20} />}
              Upload Images
            </button>
          </div>
        )}
      </div>

      {images.length === 0 ? (
        <div className="text-center py-12 bg-theme-secondary rounded-2xl border border-dashed border-[#EAB308]/30">
          <p className="text-lg text-theme-primary">No designs available yet.</p>
          {isEditMode && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 px-6 py-3 bg-[#EAB308] text-black rounded-full font-bold hover:scale-105 transition-all"
            >
              Upload First Image
            </button>
          )}
        </div>
      ) : (
        <div
          className="max-w-6xl mx-auto px-4"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative aspect-video mb-8 group cursor-pointer flex items-center justify-center overflow-visible"
            onClick={() => onImageClick(images[currentIndex])}
          >
            {!mainImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#EAB308] border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            <motion.img
              key={images[currentIndex]?.url}
              src={images[currentIndex]?.url}
              alt={`${title} featured`}
              className={`w-full h-full object-contain transition-opacity duration-500 image-preserve ${mainImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setMainImageLoaded(true)}
            />

            {isEditMode && (
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  if(confirm("Permanently delete this image?")) {
                    const success = await deleteFromCloudinary(images[currentIndex].public_id);
                    if (success) {
                      onDelete(currentIndex);
                      if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
                    } else {
                      alert("Failed to delete from server. Please try again.");
                    }
                  }
                }}
                className="absolute top-4 left-4 p-3 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-20"
              >
                <Trash2 size={20} />
              </button>
            )}

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-black/20 hover:bg-black/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 z-10"
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-black/20 hover:bg-black/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 z-10"
                >
                  <ChevronRight size={24} className="text-white" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-4 flex gap-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-[#EAB308]'
                      : 'w-2 bg-white/50'
                  }`}
                />
              ))}
            </div>

            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>

          {images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={getFlexClasses()}
            >
              {images.map((img, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={getThumbnailWidth()}
                >
                  <div
                    className={`relative w-full pb-[100%] rounded-lg overflow-hidden bg-black cursor-pointer transition-all duration-300 ${
                      index === currentIndex
                        ? 'ring-4 ring-[#EAB308] shadow-xl'
                        : 'ring-2 ring-transparent hover:ring-[#EAB308]/50'
                    }`}
                    onClick={() => selectImage(index)}
                  >
                    {!thumbnailsLoaded[index] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                        <div className="w-6 h-6 border-3 border-[#EAB308] border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                    <img
                      src={img.url}
                      alt=""
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 image-preserve ${thumbnailsLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => handleThumbnailLoad(index)}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <Eye size={20} className="text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}

// CRUD Controls Component
const CrudControls = ({ onAdd, onDelete, onMoveUp, onMoveDown, showMove = true, className = "" }) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      {onAdd && (
        <button
          onClick={onAdd}
          className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          title="Add new"
        >
          <Plus size={16} />
        </button>
      )}
      {onMoveUp && showMove && (
        <button
          onClick={onMoveUp}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          title="Move up"
        >
          <ChevronUp size={16} />
        </button>
      )}
      {onMoveDown && showMove && (
        <button
          onClick={onMoveDown}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          title="Move down"
        >
          <ChevronDown size={16} />
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          title="Delete"
        >
          <Trash size={16} />
        </button>
      )}
    </div>
  )
}

// Image Modal Component
const ImageModal = ({ src, isOpen, onClose, onPrev, onNext }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  useEffect(() => {
    const handlePopState = () => {
      if (isOpen) {
        onClose()
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ modal: true }, '')
    } else {
      if (window.history.state?.modal) {
        window.history.back()
      }
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    if (isOpen) setImageLoaded(false)
  }, [isOpen, src])

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      onNext()
    } else if (isRightSwipe) {
      onPrev()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
          onClick={onClose}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onClose() }}
            className="absolute top-8 right-8 p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors z-[101]"
          >
            <X size={28} className="text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            className="hidden md:block absolute left-2 md:left-8 p-2 md:p-4 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full transition-all group z-[101]"
          >
            <ChevronLeft size={32} className="text-white group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onNext() }}
            className="hidden md:block absolute right-2 md:right-8 p-2 md:p-4 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full transition-all group z-[101]"
          >
            <ChevronRight size={32} className="text-white group-hover:scale-110 transition-transform" />
          </button>

          <div className="absolute top-20 left-1/2 -translate-x-1/2 md:hidden text-white/50 text-sm bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
            ← swipe to navigate →
          </div>

          <motion.div
            key={src?.url}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative max-w-[95vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#EAB308] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <img
              src={src?.url}
              alt="Project View"
              className={`max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Section Title Component
const SectionTitle = ({ children, align = "left", subtitle, isEditMode, onTitleEdit, onSubtitleEdit }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}
  >
    <RichTextEditor
      value={children}
      onSave={onTitleEdit}
      isEditMode={isEditMode}
      className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-theme-primary"
      placeholder="Section Title"
    />
    {subtitle && (
      <RichTextEditor
        value={subtitle}
        onSave={onSubtitleEdit}
        isEditMode={isEditMode}
        className="mt-4 text-theme-secondary text-lg max-w-2xl mx-auto"
        placeholder="Section Subtitle"
      />
    )}
    <div className={`h-[2px] w-24 bg-[#EAB308] mt-6 ${align === 'center' ? 'mx-auto' : ''}`} />
  </motion.div>
)

// Experience Section Component
const ExperienceSection = ({ isEditMode }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [expData, setExpData] = useState(() => {
    const saved = localStorage.getItem('experienceData')
    return saved ? JSON.parse(saved) : {
      professionalSummaryTitle: "Professional Summary",
      summary: "",

      workHistoryTitle: "Work History",
      work: [],

      educationTitle: "Education",
      education: {
        degree: "",
        school: "",
        period: ""
      }
    }
  })

  useEffect(() => {
    localStorage.setItem('experienceData', JSON.stringify(expData))
  }, [expData])

  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  const updateProfessionalSummaryTitle = (newTitle) => {
    setExpData(prev => ({ ...prev, professionalSummaryTitle: newTitle }))
  }

  const updateSummary = (newSummary) => {
    setExpData(prev => ({ ...prev, summary: newSummary }))
  }

  const updateWorkHistoryTitle = (newTitle) => {
    setExpData(prev => ({ ...prev, workHistoryTitle: newTitle }))
  }

  const addWork = () => {
    const newWork = {
      id: generateId(),
      title: "",
      company: "",
      period: "",
      type: "",
      responsibilities: []
    }
    setExpData(prev => ({
      ...prev,
      work: [...prev.work, newWork]
    }))
  }

  const deleteWork = (workId) => {
    if (confirm("Delete this work experience?")) {
      setExpData(prev => ({
        ...prev,
        work: prev.work.filter(w => w.id !== workId)
      }))
    }
  }

  const moveWork = (workId, direction) => {
    const index = expData.work.findIndex(w => w.id === workId)
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === expData.work.length - 1)
    ) return

    const newWork = [...expData.work]
    const newIndex = direction === 'up' ? index - 1 : index + 1
    ;[newWork[index], newWork[newIndex]] = [newWork[newIndex], newWork[index]]

    setExpData(prev => ({ ...prev, work: newWork }))
  }

  const updateWork = (workId, field, value) => {
    setExpData(prev => ({
      ...prev,
      work: prev.work.map(item =>
        item.id === workId ? { ...item, [field]: value } : item
      )
    }))
  }

  const addResponsibility = (workId) => {
    const newResp = {
      id: generateId(),
      text: ""
    }
    setExpData(prev => ({
      ...prev,
      work: prev.work.map(item =>
        item.id === workId
          ? { ...item, responsibilities: [...item.responsibilities, newResp] }
          : item
      )
    }))
  }

  const deleteResponsibility = (workId, respId) => {
    if (confirm("Delete this responsibility?")) {
      setExpData(prev => ({
        ...prev,
        work: prev.work.map(item =>
          item.id === workId
            ? { ...item, responsibilities: item.responsibilities.filter(r => r.id !== respId) }
            : item
        )
      }))
    }
  }

  const moveResponsibility = (workId, respId, direction) => {
    const work = expData.work.find(w => w.id === workId)
    const index = work.responsibilities.findIndex(r => r.id === respId)

    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === work.responsibilities.length - 1)
    ) return

    const newResponsibilities = [...work.responsibilities]
    const newIndex = direction === 'up' ? index - 1 : index + 1
    ;[newResponsibilities[index], newResponsibilities[newIndex]] = [newResponsibilities[newIndex], newResponsibilities[index]]

    setExpData(prev => ({
      ...prev,
      work: prev.work.map(item =>
        item.id === workId ? { ...item, responsibilities: newResponsibilities } : item
      )
    }))
  }

  const updateResponsibility = (workId, respId, value) => {
    setExpData(prev => ({
      ...prev,
      work: prev.work.map(item =>
        item.id === workId ? {
          ...item,
          responsibilities: item.responsibilities.map(r =>
            r.id === respId ? { ...r, text: value } : r
          )
        } : item
      )
    }))
  }

  const updateEducationTitle = (newTitle) => {
    setExpData(prev => ({ ...prev, educationTitle: newTitle }))
  }

  const updateEducation = (field, value) => {
    setExpData(prev => ({
      ...prev,
      education: { ...prev.education, [field]: value }
    }))
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-theme-secondary transition-colors duration-500">
      <div className="max-w-5xl mx-auto relative">
        {isEditMode && (
          <CrudControls
            onAdd={addWork}
            className="absolute -top-12 right-0"
          />
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between gap-4 p-6 rounded-2xl bg-theme-primary border border-theme hover:shadow-lg transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#EAB308]/10 rounded-full">
              <Briefcase size={24} className="text-[#EAB308]" />
            </div>
            <div className="text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-theme-primary">Professional Experience</h2>
              <p className="text-sm text-theme-secondary opacity-60">Click to {isExpanded ? 'collapse' : 'expand'} my career journey</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="p-2 rounded-full bg-theme-secondary group-hover:bg-[#EAB308]/10 transition-colors"
          >
            <ChevronDown size={24} className="text-[#EAB308]" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <div className="mt-8 space-y-12">
                <div className="bg-theme-primary rounded-2xl p-8 border border-theme relative">
                  {isEditMode && (
                    <CrudControls
                      onDelete={() => {
                        if (confirm("Clear summary?")) {
                          updateSummary("")
                        }
                      }}
                      className="absolute top-4 right-4"
                    />
                  )}
                  <RichTextEditor
                    value={expData.professionalSummaryTitle}
                    onSave={updateProfessionalSummaryTitle}
                    isEditMode={isEditMode}
                    className="text-xl font-bold text-[#EAB308] mb-4"
                    placeholder="Professional Summary Title"
                  />
                  <RichTextEditor
                    value={expData.summary}
                    onSave={updateSummary}
                    isEditMode={isEditMode}
                    className="text-theme-secondary leading-relaxed"
                    placeholder="Add your professional summary here..."
                  />
                </div>

                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <RichTextEditor
                      value={expData.workHistoryTitle}
                      onSave={updateWorkHistoryTitle}
                      isEditMode={isEditMode}
                      className="text-2xl font-bold text-theme-primary"
                      placeholder="Work History Title"
                    />
                  </div>

                  {expData.work.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-8 border-l-2 border-[#EAB308]/30 hover:border-[#EAB308] transition-colors group"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#EAB308] opacity-30 group-hover:opacity-100 transition-opacity" />

                      {isEditMode && (
                        <CrudControls
                          onAdd={() => addResponsibility(job.id)}
                          onDelete={() => deleteWork(job.id)}
                          onMoveUp={() => moveWork(job.id, 'up')}
                          onMoveDown={() => moveWork(job.id, 'down')}
                          className="absolute -top-2 right-0"
                        />
                      )}

                      <div className="bg-theme-primary rounded-xl p-6 border border-theme hover:shadow-lg transition-all">
                        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                          <div>
                            <RichTextEditor
                              value={job.title}
                              onSave={(val) => updateWork(job.id, 'title', val)}
                              isEditMode={isEditMode}
                              className="text-xl font-bold text-theme-primary"
                              placeholder="Job Title"
                            />
                            <RichTextEditor
                              value={job.company}
                              onSave={(val) => updateWork(job.id, 'company', val)}
                              isEditMode={isEditMode}
                              className="text-[#EAB308] font-medium"
                              placeholder="Company Name"
                            />
                          </div>
                          <div className="text-right">
                            <RichTextEditor
                              value={job.period}
                              onSave={(val) => updateWork(job.id, 'period', val)}
                              isEditMode={isEditMode}
                              className="text-sm text-theme-secondary opacity-60"
                              placeholder="Start Date - End Date"
                            />
                            <RichTextEditor
                              value={job.type}
                              onSave={(val) => updateWork(job.id, 'type', val)}
                              isEditMode={isEditMode}
                              className="text-xs px-3 py-1 bg-[#EAB308]/10 text-[#EAB308] rounded-full mt-2"
                              placeholder="Job Type"
                            />
                          </div>
                        </div>

                        <ul className="space-y-3">
                          {job.responsibilities.map((resp, respIndex) => (
                            <li key={resp.id} className="flex gap-3 group/resp">
                              <span className="text-[#EAB308] mt-1">•</span>
                              <RichTextEditor
                                value={resp.text}
                                onSave={(val) => updateResponsibility(job.id, resp.id, val)}
                                isEditMode={isEditMode}
                                className="text-theme-secondary text-sm leading-relaxed flex-1"
                                placeholder="Add responsibility..."
                              />
                              {isEditMode && (
                                <CrudControls
                                  onDelete={() => deleteResponsibility(job.id, resp.id)}
                                  onMoveUp={() => moveResponsibility(job.id, resp.id, 'up')}
                                  onMoveDown={() => moveResponsibility(job.id, resp.id, 'down')}
                                  className="opacity-0 group-hover/resp:opacity-100 transition-opacity"
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-theme-primary rounded-2xl p-8 border border-theme relative">
                  {isEditMode && (
                    <CrudControls
                      onDelete={() => {
                        if (confirm("Clear education?")) {
                          updateEducation('degree', '')
                          updateEducation('school', '')
                          updateEducation('period', '')
                        }
                      }}
                      className="absolute top-4 right-4"
                    />
                  )}
                  <RichTextEditor
                    value={expData.educationTitle}
                    onSave={updateEducationTitle}
                    isEditMode={isEditMode}
                    className="text-xl font-bold text-[#EAB308] mb-4"
                    placeholder="Education Title"
                  />
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <RichTextEditor
                        value={expData.education.degree}
                        onSave={(val) => updateEducation('degree', val)}
                        isEditMode={isEditMode}
                        className="text-lg font-bold text-theme-primary"
                        placeholder="Degree"
                      />
                      <RichTextEditor
                        value={expData.education.school}
                        onSave={(val) => updateEducation('school', val)}
                        isEditMode={isEditMode}
                        className="text-theme-secondary"
                        placeholder="School/University"
                      />
                    </div>
                    <RichTextEditor
                      value={expData.education.period}
                      onSave={(val) => updateEducation('period', val)}
                      isEditMode={isEditMode}
                      className="text-sm text-theme-secondary opacity-60"
                      placeholder="Period"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

// Stat Item Component
const StatItem = ({ stat, index, onUpdate, onDelete, onMove, isEditMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group/stat"
    >
      {isEditMode && (
        <CrudControls
          onDelete={onDelete}
          onMoveUp={() => onMove('up')}
          onMoveDown={() => onMove('down')}
          className="absolute -top-8 right-0 opacity-0 group-hover/stat:opacity-100 transition-opacity"
        />
      )}
      <RichTextEditor
        value={stat.n}
        onSave={(val) => onUpdate('n', val)}
        isEditMode={isEditMode}
        className="text-xl sm:text-2xl md:text-3xl font-bold text-[#EAB308]"
        placeholder="Number"
      />
      <RichTextEditor
        value={stat.l}
        onSave={(val) => onUpdate('l', val)}
        isEditMode={isEditMode}
        className="text-xs sm:text-sm text-theme-secondary"
        placeholder="Label"
      />
    </motion.div>
  )
}

// Promise Item Component
const PromiseItem = ({ item, index, onUpdate, onDelete, onMove, isEditMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      viewport={{ once: true }}
      className="group p-4 sm:p-5 md:p-6 lg:p-8 rounded-[30px] sm:rounded-[35px] md:rounded-[40px] bg-theme-primary border border-theme hover:shadow-xl transition-all duration-500 relative"
    >
      {isEditMode && (
        <CrudControls
          onDelete={onDelete}
          onMoveUp={() => onMove('up')}
          onMoveDown={() => onMove('down')}
          className="absolute -top-8 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      )}
      <RichTextEditor
        value={item.n}
        onSave={(val) => onUpdate('n', val)}
        isEditMode={isEditMode}
        className="text-4xl sm:text-5xl md:text-6xl font-black text-[#EAB308]/20 mb-3 sm:mb-4 md:mb-5 lg:mb-6"
        placeholder="00"
      />
      <RichTextEditor
        value={item.t}
        onSave={(val) => onUpdate('t', val)}
        isEditMode={isEditMode}
        className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 text-theme-primary"
        placeholder="Title"
      />
      <RichTextEditor
        value={item.d}
        onSave={(val) => onUpdate('d', val)}
        isEditMode={isEditMode}
        className="text-sm sm:text-base md:text-lg text-theme-secondary leading-relaxed"
        placeholder="Description..."
      />
    </motion.div>
  )
}

function App() {
  const [isEditMode] = useState(() => {
    if (window.location.search.includes('view=public') || window.location.pathname.includes('ronmedina')) return false;
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.search.includes('edit=true');
  })

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) return saved === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const [gallerySections, setGallerySections] = useState(() => {
    const saved = localStorage.getItem('gallerySections')
    if (saved) {
      return JSON.parse(saved)
    }
    return [
      {
        id: 'uiux',
        categoryId: 'uiux_design',
        title: 'UI/UX Design',
        subtitle: 'Clean, intuitive interfaces for digital products',
        images: []
      },
      {
        id: 'brand',
        categoryId: 'brand_identity',
        title: 'Brand Identity',
        subtitle: 'Guidelines and identity systems that define brands',
        images: []
      },
      {
        id: 'social',
        categoryId: 'social_media',
        title: 'Social Media',
        subtitle: 'Engaging visual content for social platforms',
        images: []
      },
      {
        id: 'print',
        categoryId: 'presentations_print',
        title: 'Presentations & Print',
        subtitle: 'Professional presentation and print materials',
        images: []
      }
    ]
  })

  const [profileUrl, setProfileUrl] = useState(localStorage.getItem('ron_profile_url') || '')
  const [profileId, setProfileId] = useState(localStorage.getItem('ron_profile_id') || '')
  const [bgUrl, setBgUrl] = useState(localStorage.getItem('ron_bg_url') || '')
  const [bgId, setBgId] = useState(localStorage.getItem('ron_bg_id') || '')
  const [loading, setLoading] = useState(true)

  // ALL TEXT STATES - EMPTY BY DEFAULT
  const [heroTitle, setHeroTitle] = useState(() => localStorage.getItem('heroTitle') || "")
  const [heroSubtitle, setHeroSubtitle] = useState(() => localStorage.getItem('heroSubtitle') || "")
  

const [aboutName, setAboutName] = useState(() => localStorage.getItem('aboutName') || "")
  
  const [aboutText, setAboutText] = useState(() => localStorage.getItem('aboutText') || "")

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('stats')
    return saved ? JSON.parse(saved) : [
      { id: '1', n: '', l: '' },
      { id: '2', n: '', l: '' },
      { id: '3', n: '', l: '' }
    ]
  })

  const [promiseItems, setPromiseItems] = useState(() => {
    const saved = localStorage.getItem('promiseItems')
    return saved ? JSON.parse(saved) : [
      { id: '1', n: "01", t: "", d: "" },
      { id: '2', n: "02", t: "", d: "" }
    ]
  })

  const [twoThingsTitle, setTwoThingsTitle] = useState(() => localStorage.getItem('twoThingsTitle') || "Two Things")
  const [twoThingsSubtitle, setTwoThingsSubtitle] = useState(() => localStorage.getItem('twoThingsSubtitle') || "")

  const [contactTitle, setContactTitle] = useState(() => localStorage.getItem('contactTitle') || "")
  const [contactText, setContactText] = useState(() => localStorage.getItem('contactText') || "")
  const [contactButton, setContactButton] = useState(() => localStorage.getItem('contactButton') || "")

  const [footerName, setFooterName] = useState(() => localStorage.getItem('footerName') || "")
  const [footerText, setFooterText] = useState(() => localStorage.getItem('footerText') || "")
  const [footerEmail, setFooterEmail] = useState(() => localStorage.getItem('footerEmail') || "")
  const [copyright, setCopyright] = useState(() => localStorage.getItem('copyright') || "")

  // Save all changes to localStorage
  useEffect(() => { localStorage.setItem('gallerySections', JSON.stringify(gallerySections)) }, [gallerySections])
  useEffect(() => { localStorage.setItem('heroTitle', heroTitle) }, [heroTitle])
  useEffect(() => { localStorage.setItem('heroSubtitle', heroSubtitle) }, [heroSubtitle])
 
  useEffect(() => { localStorage.setItem('aboutName', aboutName) }, [aboutName])
  useEffect(() => { localStorage.setItem('aboutText', aboutText) }, [aboutText])
  useEffect(() => { localStorage.setItem('stats', JSON.stringify(stats)) }, [stats])
  useEffect(() => { localStorage.setItem('promiseItems', JSON.stringify(promiseItems)) }, [promiseItems])
  useEffect(() => { localStorage.setItem('twoThingsTitle', twoThingsTitle) }, [twoThingsTitle])
  useEffect(() => { localStorage.setItem('twoThingsSubtitle', twoThingsSubtitle) }, [twoThingsSubtitle])
  useEffect(() => { localStorage.setItem('contactTitle', contactTitle) }, [contactTitle])
  useEffect(() => { localStorage.setItem('contactText', contactText) }, [contactText])
  useEffect(() => { localStorage.setItem('contactButton', contactButton) }, [contactButton])
  useEffect(() => { localStorage.setItem('footerName', footerName) }, [footerName])
  useEffect(() => { localStorage.setItem('footerText', footerText) }, [footerText])
  useEffect(() => { localStorage.setItem('footerEmail', footerEmail) }, [footerEmail])
  useEffect(() => { localStorage.setItem('copyright', copyright) }, [copyright])

  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  // Gallery Section CRUD
  const addGallerySection = () => {
    const newSection = {
      id: generateId(),
      categoryId: generateId(),
      title: 'New Gallery Section',
      subtitle: 'Add a description here',
      images: []
    }
    setGallerySections(prev => [...prev, newSection])
  }

  const deleteGallerySection = (sectionId) => {
    if (confirm("Delete this entire gallery section?")) {
      setGallerySections(prev => prev.filter(s => s.id !== sectionId))
    }
  }

  const moveGallerySection = (sectionId, direction) => {
    setGallerySections(prev => {
      const index = prev.findIndex(s => s.id === sectionId)
      if (
        (direction === 'up' && index === 0) ||
        (direction === 'down' && index === prev.length - 1)
      ) return prev

      const newSections = [...prev]
      const newIndex = direction === 'up' ? index - 1 : index + 1
      ;[newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]]
      return newSections
    })
  }

  const updateGallerySection = (sectionId, field, value) => {
    setGallerySections(prev => prev.map(section =>
      section.id === sectionId ? { ...section, [field]: value } : section
    ))
  }

  const updateGalleryImages = (sectionId, images) => {
    setGallerySections(prev => prev.map(section =>
      section.id === sectionId ? { ...section, images } : section
    ))
  }

  // Stats CRUD
  const addStat = () => {
    setStats(prev => [...prev, { id: generateId(), n: '', l: '' }])
  }

  const updateStat = (id, field, value) => {
    setStats(prev => prev.map(stat =>
      stat.id === id ? { ...stat, [field]: value } : stat
    ))
  }

  const deleteStat = (id) => {
    if (confirm("Delete this stat?")) {
      setStats(prev => prev.filter(stat => stat.id !== id))
    }
  }

  const moveStat = (id, direction) => {
    setStats(prev => {
      const index = prev.findIndex(s => s.id === id)
      if (
        (direction === 'up' && index === 0) ||
        (direction === 'down' && index === prev.length - 1)
      ) return prev

      const newStats = [...prev]
      const newIndex = direction === 'up' ? index - 1 : index + 1
      ;[newStats[index], newStats[newIndex]] = [newStats[newIndex], newStats[index]]
      return newStats
    })
  }

  // Promise Items CRUD
  const addPromiseItem = () => {
    const newNumber = (promiseItems.length + 1).toString().padStart(2, '0')
    setPromiseItems(prev => [...prev, {
      id: generateId(),
      n: newNumber,
      t: '',
      d: ''
    }])
  }

  const updatePromiseItem = (id, field, value) => {
    setPromiseItems(prev => prev.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const deletePromiseItem = (id) => {
    if (confirm("Delete this promise item?")) {
      setPromiseItems(prev => prev.filter(item => item.id !== id))
    }
  }

  const movePromiseItem = (id, direction) => {
    setPromiseItems(prev => {
      const index = prev.findIndex(i => i.id === id)
      if (
        (direction === 'up' && index === 0) ||
        (direction === 'down' && index === prev.length - 1)
      ) return prev

      const newItems = [...prev]
      const newIndex = direction === 'up' ? index - 1 : index + 1
      ;[newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]]

      return newItems.map((item, i) => ({
        ...item,
        n: (i + 1).toString().padStart(2, '0')
      }))
    })
  }

  // Load images from Cloudinary
  useEffect(() => {
    const loadAllImages = async () => {
      setLoading(true)
      try {
        const [uiux, brand, social, print, profiles, bgs] = await Promise.allSettled([
          fetchImagesByTag('uiux_design'),
          fetchImagesByTag('brand_identity'),
          fetchImagesByTag('social_media'),
          fetchImagesByTag('presentations_print'),
          fetchImagesByTag('static_profile'),
          fetchImagesByTag('static_bg')
        ])

        setGallerySections(prev => {
          const updated = prev.map(section => {
            if (section.categoryId === 'uiux_design' || section.id === 'uiux') {
              return { ...section, images: uiux.status === 'fulfilled' ? uiux.value : [] }
            }
            if (section.categoryId === 'brand_identity' || section.id === 'brand') {
              return { ...section, images: brand.status === 'fulfilled' ? brand.value : [] }
            }
            if (section.categoryId === 'social_media' || section.id === 'social') {
              return { ...section, images: social.status === 'fulfilled' ? social.value : [] }
            }
            if (section.categoryId === 'presentations_print' || section.id === 'print') {
              return { ...section, images: print.status === 'fulfilled' ? print.value : [] }
            }
            return section
          })
          localStorage.setItem('gallerySections', JSON.stringify(updated))
          return updated
        })

        if (profiles.status === 'fulfilled' && profiles.value.length > 0) {
          const latest = profiles.value.sort((a,b) => b.version - a.version)[0];
          setProfileUrl(latest.url); setProfileId(latest.public_id);
          localStorage.setItem('ron_profile_url', latest.url); localStorage.setItem('ron_profile_id', latest.public_id);
        }
        if (bgs.status === 'fulfilled' && bgs.value.length > 0) {
          const latest = bgs.value.sort((a,b) => b.version - a.version)[0];
          setBgUrl(latest.url); setBgId(latest.public_id);
          localStorage.setItem('ron_bg_url', latest.url); localStorage.setItem('ron_bg_id', latest.public_id);
        }
      } catch (error) {
        console.error('Error loading portfolio images:', error)
      } finally {
        setLoading(false)
      }
    }
    loadAllImages()
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', String(darkMode))
  }, [darkMode])

  const [selectedImage, setSelectedImage] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const heroRef = useRef(null)
  const workRef = useRef(null)
  const aboutRef = useRef(null)
  const contactRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fixed useScroll with layoutEffect: false
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
    layoutEffect: false
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.8])

  const handleStaticUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const currentImages = await fetchImagesByTag(`static_${type}`);
    if (currentImages.length > 0) {
      for (const img of currentImages) {
        await deleteFromCloudinary(img.public_id);
      }
    }

    const data = await uploadToCloudinary(file, `static_${type}`);
    if (data) {
      if (type === 'profile') {
        setProfileUrl(data.url); setProfileId(data.public_id);
        localStorage.setItem('ron_profile_url', data.url); localStorage.setItem('ron_profile_id', data.public_id);
      }
      else {
        setBgUrl(data.url); setBgId(data.public_id);
        localStorage.setItem('ron_bg_url', data.url); localStorage.setItem('ron_bg_id', data.public_id);
      }
    }
  }

  const allAssets = useMemo(() => gallerySections.flatMap(section => section.images), [gallerySections])

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#EAB308] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="bg-theme-primary text-theme-primary transition-colors duration-500 overflow-x-hidden min-h-screen relative">

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 transition-all ${
          scrolled ? "bg-theme-primary/80 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
          <div className="w-10 h-10 rounded-full bg-[#EAB308] overflow-hidden">
            <img src={profileUrl} alt="Ron" className="w-full h-full object-cover" />
          </div>
          <span className={`font-bold transition-colors ${scrolled ? "text-theme-primary" : "text-white"}`}>
            RON MEDINA
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className={`flex gap-8 text-sm font-medium transition-colors ${scrolled ? "text-theme-secondary" : "text-white/80"}`}>
            <button onClick={() => scrollToSection(workRef)} className="hover:text-[#EAB308] transition-colors">Work</button>
            <button onClick={() => scrollToSection(aboutRef)} className="hover:text-[#EAB308] transition-colors">About</button>
            <button onClick={() => scrollToSection(contactRef)} className="hover:text-[#EAB308] transition-colors">Contact</button>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full transition-colors bg-white/10">
            {darkMode ? <Sun size={18} className={scrolled ? "text-theme-primary" : "text-white"} /> : <Moon size={18} className={scrolled ? "text-theme-primary" : "text-white"} />}
          </button>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 bg-white/10 rounded-full transition-colors">
          {mobileMenuOpen ? <X size={18} className={scrolled || darkMode ? "text-theme-primary" : "text-white"} /> : <Menu size={18} className={scrolled || darkMode ? "text-theme-primary" : "text-white"} />}
        </button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-4 right-4 md:hidden bg-theme-primary rounded-2xl shadow-xl border border-theme p-4"
            >
              <div className="flex flex-col gap-4">
                <button onClick={() => scrollToSection(workRef)} className="text-left px-4 py-3 hover:bg-theme-secondary rounded-xl transition-colors text-theme-primary">Work</button>
                <button onClick={() => scrollToSection(aboutRef)} className="text-left px-4 py-3 hover:bg-theme-secondary rounded-xl transition-colors text-theme-primary">About</button>
                <button onClick={() => scrollToSection(contactRef)} className="text-left px-4 py-3 hover:bg-theme-secondary rounded-xl transition-colors text-theme-primary">Contact</button>
                <div className="border-t border-theme pt-4">
                  <button onClick={() => setDarkMode(!darkMode)} className="flex items-center justify-between w-full px-4 py-3 hover:bg-theme-secondary rounded-xl transition-colors text-theme-primary">
                    <span>Theme</span> {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-black transition-colors duration-500">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity }} className="absolute inset-0">
            <img src={bgUrl} alt="Background" className="w-full h-full object-cover opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/20 transition-colors duration-500" />
          </motion.div>
        </motion.div>

        {isEditMode && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30">
            <input type="file" onChange={(e)=>handleStaticUpload(e,'bg')} className="hidden" id="bg-upload" />
            <label htmlFor="bg-upload" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold cursor-pointer border border-white/20 transition-all flex items-center gap-2">
              <Upload size={14} /> Update Background
            </label>
          </div>
        )}

        <div className="relative z-10 text-center px-4 w-full">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="flex flex-col items-center">
            <RichTextEditor
              value={heroTitle}
              onSave={setHeroTitle}
              isEditMode={isEditMode}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-4 sm:mb-6 tracking-tighter px-2"
              placeholder="Hero Title"
            />
            <RichTextEditor
              value={heroSubtitle}
              onSave={setHeroSubtitle}
              isEditMode={isEditMode}
              className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-[0.3em] sm:tracking-[0.5em] uppercase mb-8 sm:mb-12 px-4"
              placeholder="Hero Subtitle"
            />
          </motion.div>
        </div>

        <button onClick={() => scrollToSection(workRef)} className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 left-1/2 -translate-x-1/2 cursor-pointer hover:text-[#EAB308] transition-colors z-20">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-white/60 hover:text-[#EAB308]" />
          </motion.div>
        </button>
      </section>

      <main className="relative z-20 bg-theme-primary transition-colors duration-500">

        {/* Profile Section */}
        <section ref={aboutRef} className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative group cursor-pointer">
                <div className="relative aspect-[3/4] max-w-sm sm:max-w-md mx-auto" onClick={() => setSelectedImage({url: profileUrl})}>
                  <div className="absolute inset-0 bg-[#EAB308] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] rotate-3 group-hover:rotate-6 transition-transform duration-500" />
                  <div className="absolute inset-3 sm:inset-4 bg-black rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden transition-colors duration-500">
                    <img src={profileUrl} alt="Ron" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                {isEditMode && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
                    <input type="file" onChange={(e)=>handleStaticUpload(e,'profile')} className="hidden" id="profile-upload" />
                    <label htmlFor="profile-upload" className="bg-[#EAB308] text-black px-4 py-2 rounded-full text-xs font-bold cursor-pointer shadow-xl transition-all flex items-center gap-2">
                      <Upload size={14} /> Update Profile
                    </label>
                  </div>
                )}
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4 sm:space-y-5 md:space-y-6 px-2 sm:px-0">
<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-theme-primary min-h-[1.5em]">
  <RichTextEditor 
    value={aboutName} 
    onSave={setAboutName} 
    isEditMode={isEditMode} 
    className="text-[#EAB308] inline-block" 
    placeholder="Your Name"
  />
</h2>
                <div>
                  <RichTextEditor
                    value={aboutText}
                    onSave={setAboutText}
                    isEditMode={isEditMode}
                    className="text-base sm:text-lg md:text-xl lg:text-2xl text-theme-secondary leading-relaxed"
                    placeholder="Designing simplicity out of complexity. Currently crafting digital experiences that matter."
                  />
                </div>

                <div className="flex gap-4 sm:gap-6 md:gap-8 pt-4 sm:pt-6 md:pt-8 relative">
                  {isEditMode && (
                    <CrudControls
                      onAdd={addStat}
                      className="absolute -top-8 right-0"
                    />
                  )}
                  {stats.map((stat, i) => (
                    <StatItem
                      key={stat.id}
                      stat={stat}
                      index={i}
                      onUpdate={(field, value) => updateStat(stat.id, field, value)}
                      onDelete={() => deleteStat(stat.id)}
                      onMove={(direction) => moveStat(stat.id, direction)}
                      isEditMode={isEditMode}
                    />
                  ))}
                </div>

                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => scrollToSection(contactRef)} className="mt-4 sm:mt-6 md:mt-8 group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-[#EAB308] text-black rounded-full text-sm sm:text-base font-medium">
                  Let's work together <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <ExperienceSection isEditMode={isEditMode} />

        {/* Gallery Sections */}
        <section ref={workRef} className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-theme-secondary transition-colors duration-500">
          <div className="max-w-7xl mx-auto">
            {isEditMode && (
              <div className="mb-8 flex justify-center">
                <button
                  onClick={addGallerySection}
                  className="flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-full font-bold hover:bg-green-600 transition-all hover:scale-105 shadow-lg"
                >
                  <Plus size={20} />
                  Add New Gallery Section
                </button>
              </div>
            )}

            {gallerySections.map((section, index) => (
              <GallerySection
                key={section.id}
                id={section.id}
                categoryId={section.categoryId}
                images={section.images}
                title={section.title}
                subtitle={section.subtitle}
                onImageClick={setSelectedImage}
                isEditMode={isEditMode}
                onUpload={(data) => {
                  const updatedImages = [...section.images, data]
                  updateGalleryImages(section.id, updatedImages)
                }}
                onDelete={(imageIndex) => {
                  const updatedImages = section.images.filter((_, idx) => idx !== imageIndex)
                  updateGalleryImages(section.id, updatedImages)
                }}
                onTitleEdit={(val) => updateGallerySection(section.id, 'title', val)}
                onSubtitleEdit={(val) => updateGallerySection(section.id, 'subtitle', val)}
                onMoveUp={index > 0 ? () => moveGallerySection(section.id, 'up') : null}
                onMoveDown={index < gallerySections.length - 1 ? () => moveGallerySection(section.id, 'down') : null}
                onDeleteSection={() => deleteGallerySection(section.id)}
                showMoveUp={index > 0}
                showMoveDown={index < gallerySections.length - 1}
              />
            ))}
          </div>
        </section>

        {/* Promise Section */}
        <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-theme-primary transition-colors duration-500">
          <div className="max-w-7xl mx-auto relative">
            {isEditMode && (
              <CrudControls
                onAdd={addPromiseItem}
                className="absolute -top-12 right-0"
              />
            )}

            <SectionTitle 
              align="center" 
              subtitle={twoThingsSubtitle} 
              isEditMode={isEditMode} 
              onTitleEdit={setTwoThingsTitle} 
              onSubtitleEdit={setTwoThingsSubtitle}
            >
              {twoThingsTitle}
            </SectionTitle>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mt-8 sm:mt-10 md:mt-12 lg:mt-16">
              {promiseItems.map((item, i) => (
                <PromiseItem
                  key={item.id}
                  item={item}
                  index={i}
                  onUpdate={(field, value) => updatePromiseItem(item.id, field, value)}
                  onDelete={() => deletePromiseItem(item.id)}
                  onMove={(direction) => movePromiseItem(item.id, direction)}
                  isEditMode={isEditMode}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-[#EAB308] text-center">
          <RichTextEditor
            value={contactTitle}
            onSave={setContactTitle}
            isEditMode={isEditMode}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-4 sm:mb-5 px-2"
            placeholder="Contact Title"
          />
          <RichTextEditor
            value={contactText}
            onSave={setContactText}
            isEditMode={isEditMode}
            className="text-base sm:text-lg md:text-xl text-black/80 mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
            placeholder="Contact description..."
          />
          <RichTextEditor
            value={contactButton}
            onSave={setContactButton}
            isEditMode={isEditMode}
            className="group inline-flex items-center gap-2 sm:gap-3 md:gap-4 px-6 md:px-10 py-3 md:py-5 bg-black text-white rounded-full text-sm md:text-lg font-medium"
            placeholder="Button text"
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-theme-primary border-t border-theme relative overflow-hidden transition-colors duration-500">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 text-left">
            <div>
              <RichTextEditor
                value={footerName}
                onSave={setFooterName}
                isEditMode={isEditMode}
                className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 md:mb-6"
                placeholder="Your Name"
              />
              <RichTextEditor
                value={footerText}
                onSave={setFooterText}
                isEditMode={isEditMode}
                className="text-sm sm:text-base text-theme-secondary opacity-60"
                placeholder="Footer text"
              />

              {isEditMode && (
                <div className="mt-8 p-4 bg-theme-secondary rounded-2xl border border-theme inline-block">
                  <p className="text-xs font-bold text-[#EAB308] mb-2 uppercase tracking-wider">Public Link</p>
                  <button onClick={() => { navigator.clipboard.writeText("https://portfolioss-4gai.onrender.com/"); setCopied(true); setTimeout(()=>setCopied(false),2000); }} className="flex items-center gap-2 px-4 py-2 bg-[#EAB308] text-black rounded-full text-sm font-bold active:scale-95">
                    {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "Copied!" : "Copy Public Link"}
                  </button>
                </div>
              )}

              <div className="flex gap-3 sm:gap-4 mt-8">
                <a href="https://linkedin.com" target="_blank" className="w-8 h-8 sm:w-10 sm:h-10 bg-theme-secondary border border-theme rounded-full flex items-center justify-center hover:bg-[#EAB308] hover:text-black transition-colors"><svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
                <a href="https://instagram.com" target="_blank" className="w-8 h-8 sm:w-10 sm:h-10 bg-theme-secondary border border-theme rounded-full flex items-center justify-center hover:bg-[#EAB308] hover:text-black transition-colors"><svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/></svg></a>
              </div>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 md:mb-6">Navigation</h4>
              <ul className="space-y-2 sm:space-y-2.5 opacity-60 text-sm sm:text-base">
                <li><button onClick={() => scrollToSection(workRef)} className="hover:text-[#EAB308]">Work</button></li>
                <li><button onClick={() => scrollToSection(aboutRef)} className="hover:text-[#EAB308]">About</button></li>
                <li><button onClick={() => scrollToSection(contactRef)} className="hover:text-[#EAB308]">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 md:mb-6">Connect</h4>
              <ul className="space-y-2 sm:space-y-2.5 opacity-60 text-sm sm:text-base">
                <li>
                  <RichTextEditor
                    value={footerEmail}
                    onSave={setFooterEmail}
                    isEditMode={isEditMode}
                    className="hover:text-[#EAB308]"
                    placeholder="email@example.com"
                  />
                </li>
                <li><a href="https://linkedin.com" target="_blank" className="hover:text-[#EAB308]">LinkedIn</a></li>
                <li><a href="https://instagram.com" target="_blank" className="hover:text-[#EAB308]">Instagram</a></li>
              </ul>
            </div>
          </div>
          <RichTextEditor
            value={copyright}
            onSave={setCopyright}
            isEditMode={isEditMode}
            className="mt-16 text-center opacity-40 text-sm"
            placeholder="Copyright text"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 text-center opacity-[0.03] pointer-events-none text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black whitespace-nowrap text-theme-primary">RON MEDINA • RON MEDINA • RON MEDINA</div>
      </footer>

      <ImageModal src={selectedImage} isOpen={selectedImage !== null} onClose={() => setSelectedImage(null)} onNext={() => setSelectedImage(allAssets[(allAssets.indexOf(selectedImage) + 1) % allAssets.length])} onPrev={() => setSelectedImage(allAssets[(allAssets.indexOf(selectedImage) - 1 + allAssets.length) % allAssets.length])} />
    </div>
  )
}

export default App;



//done

//charlie good jib
