import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Bold, Italic, Underline, Palette, Search, Save, ChevronDown,
  AlignLeft, AlignCenter, AlignRight, List
} from 'lucide-react';

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

  const handleFontSearchChange = (e) => {
    const value = e.target.value;
    if (fontSearchTimeout.current) {
      clearTimeout(fontSearchTimeout.current);
    }
    fontSearchTimeout.current = setTimeout(() => {
      setFontSearchTerm(value);
    }, 150);
  };

  const handleColorSearchChange = (e) => {
    const value = e.target.value;
    if (colorSearchTimeout.current) {
      clearTimeout(colorSearchTimeout.current);
    }
    colorSearchTimeout.current = setTimeout(() => {
      setColorSearchTerm(value);
    }, 150);
  };

  const filteredFonts = useMemo(() => {
    return fontSearchTerm
      ? allFonts.filter(font =>
          font.toLowerCase().includes(fontSearchTerm.toLowerCase())
        )
      : allFonts;
  }, [fontSearchTerm]);

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
          <div className="bg-theme-secondary border-b border-theme p-2 flex flex-wrap gap-1 sticky top-0 z-10">
            <div className="relative">
              <button
                onClick={() => setShowFontPicker(!showFontPicker)}
                className="h-8 px-3 text-sm bg-theme-primary border border-theme rounded text-theme-primary min-w-[140px] flex items-center justify-between gap-2 hover:bg-[#EAB308]/10"
              >
                <span className="truncate">Font Family</span>
                <ChevronDown size={14} />
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

            <button
              onClick={(e) => { e.stopPropagation(); execCommand('bold'); }}
              className="p-1.5 rounded hover:bg-[#EAB308]/20 text-theme-primary min-w-[32px]"
              title="Bold (Ctrl+B)"
            >
              <Bold size={18} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); execCommand('italic'); }}
              className="p-1.5 rounded hover:bg-[#EAB308]/20 text-theme-primary min-w-[32px]"
              title="Italic (Ctrl+I)"
            >
              <Italic size={18} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); execCommand('underline'); }}
              className="p-1.5 rounded hover:bg-[#EAB308]/20 text-theme-primary min-w-[32px]"
              title="Underline (Ctrl+U)"
            >
              <Underline size={18} />
            </button>

            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setShowColorPicker(!showColorPicker); }}
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
                        onClick={(e) => { e.stopPropagation(); handleCustomColor(); }}
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
                          onClick={(e) => { e.stopPropagation(); handleColorChange(color.value); }}
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

            <button
              onClick={(e) => { e.stopPropagation(); handleTextAlign('Left'); }}
              className="p-1.5 rounded hover:bg-[#EAB308]/20 text-theme-primary min-w-[32px]"
              title="Align Left"
            >
              <AlignLeft size={18} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleTextAlign('Center'); }}
              className="p-1.5 rounded hover:bg-[#EAB308]/20 text-theme-primary min-w-[32px]"
              title="Align Center"
            >
              <AlignCenter size={18} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleTextAlign('Right'); }}
              className="p-1.5 rounded hover:bg-[#EAB308]/20 text-theme-primary min-w-[32px]"
              title="Align Right"
            >
              <AlignRight size={18} />
            </button>

            <div className="w-px h-6 bg-theme mx-1 self-center" />

            <button
              onClick={(e) => { e.stopPropagation(); insertList('ul'); }}
              className="p-1.5 rounded hover:bg-[#EAB308]/20 text-theme-primary min-w-[32px]"
              title="Bullet List"
            >
              <List size={18} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); insertList('ol'); }}
              className="p-1.5 rounded hover:bg-[#EAB308]/20 text-theme-primary min-w-[32px]"
              title="Numbered List"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 6h11M10 12h11M10 18h11M4 6h1v4M4 10h1M4 18h1v-3M4 15h1" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="flex-1" />

            <button
              onClick={(e) => { e.stopPropagation(); handleSave(); }}
              className="px-3 py-1.5 bg-[#EAB308] text-black rounded hover:bg-[#EAB308]/90 text-sm font-medium flex items-center gap-1"
            >
              <Save size={16} /> Save (Ctrl+Enter)
            </button>
          </div>

          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            className={`p-4 min-h-[200px] max-h-[500px] overflow-y-auto outline-none text-theme-primary bg-theme-primary ${className}`}
            style={{ fontFamily: 'inherit', lineHeight: '1.6' }}
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

export default RichTextEditor;
