import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

declare function require(name:string);
var I18n = require('react-redux-i18n').I18n;

export const LoadingSpinnerButton: React.FC = () => {
    return(
        <Button block variant="dark" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
          { I18n.t('loading') }
        </Button>
    )
}