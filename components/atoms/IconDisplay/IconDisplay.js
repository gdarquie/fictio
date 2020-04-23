import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';

const IconDisplay = props => {

    function toggleIcon() {
        var icon = (<ArrowDropDown />);
    
        if (props.isOpen === 'false') {
            icon = (<ArrowDropUp />);
        }
    
        return icon;
    }

    return (
        <span className='element'>
            {toggleIcon()}
            <style jsx>{`
                .element {
                    color: white;
                }
            `}</style>
        </span>
    );
}

export default IconDisplay;