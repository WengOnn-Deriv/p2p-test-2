import { render, screen } from '@testing-library/react';

import ProgressIndicator from '../ProgressIndicator';

const mockProps = {
    value: 1,
    total: 2,
};

describe('ProgressIndicator', () => {
    it('should render the component as expected', () => {
        render(<ProgressIndicator {...mockProps} />);
        expect(screen.getByTestId('dt_progress_indicator')).toBeInTheDocument();
    });
});
