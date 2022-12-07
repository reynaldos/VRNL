const GlobalTheme = {
    blur: 'blur(5px)',
    // borderRadius: '8%',
    borderRadius: '12px',
    borderThickness: '2px',
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
     text: '#F6C9BA',
    inputBG: 'rgba(246, 201, 186, 0.1)',
    elementBG: 'rgba( 113, 97, 239, 0.5)',
    icon: '#F6C9BA',
    border: '#F6C9BA',
    // border: '#50357C',
    // button: 'rgba(80, 53, 124, 1)',
    button: 'rgba(246, 201, 186, 0.6)',
    // btnText: 'rgba(246, 201, 186, 1)',
    btnText: 'white',  

    hoverBG: 'rgba(217, 217, 217, 0.2)',

}


export const lightTheme = {
    ...GlobalTheme,
    ...darkTheme,
    // text: '#50357C',
    // accentText: 'rgba(246, 201, 186, 1)',
    inputBG: 'rgba(246, 201, 186, 0.25)',
    elementBG: 'rgba(217, 217, 217, .35)',
    // icon: '#50357C',
    border: '#F6C9BA',
    // button: '#F6C9BA',
    btnText: 'white',  
    // hoverBG: 'rgba(55, 30, 166, 0.2)'
}
