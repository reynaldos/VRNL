const GlobalTheme = {
    blur: 'blur(5px)',
    borderRadius: '12px',
    borderThickness: '1px',
    maxWidth : '1400px',
    breakpoint: {
        xs: '400px',
        sm: '576px',
        md: '767px',
        lg: '1000px',
        xl: '1400px',
    }
}

export const darkTheme = {
    ...GlobalTheme,
    text: 'white',
    elementBG: 'rgba(217, 217, 217, 0.33)',
    icon: '#F6C9BA',

}


export const lightTheme = {
    ...GlobalTheme,
    text: 'black',
    elementBG: 'rgba(55, 30, 166, 0.33)',
    icon: '#50357C',

    
}
