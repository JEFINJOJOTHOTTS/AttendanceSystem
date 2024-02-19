
const { checkOverlap } = require('../controllers/instructorController');
const instructorHelper = require('../helpers/instructorHelper');

// Mocking the instructorHelper module
jest.mock('../helpers/instructorHelper', () => ({
    getReport: jest.fn(),
}));

describe('checkOverlap function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls after each test
    });

    test('should return true when there is no overlap', async () => {
        const insId = 'exampleInsId';
        const inDateTime = new Date('2024-02-19T08:00:00');
        const outDateTime = new Date('2024-02-19T09:00:00');

        // Mocking the return value of getReport
        instructorHelper.getReport.mockResolvedValueOnce([{ attendance: [] }]);

        const result = await checkOverlap(insId, inDateTime, outDateTime);
        expect(result).toBe(true);
        expect(instructorHelper.getReport).toHaveBeenCalledWith(insId, inDateTime, outDateTime, 20, 1);
    });

    test('should return false when there is an overlap', async () => {
        const insId = 'exampleInsId';
        const inDateTime = new Date('2024-02-19T08:00:00');
        const outDateTime = new Date('2024-02-19T09:00:00');
        const mockedAttendance = [{ in: new Date('2024-02-19T08:30:00'), out: new Date('2024-02-19T09:30:00') }];

        instructorHelper.getReport.mockResolvedValueOnce([{ attendance: mockedAttendance }]);

        const result = await checkOverlap(insId, inDateTime, outDateTime);
        expect(result).toBe(false);
        expect(instructorHelper.getReport).toHaveBeenCalledWith(insId, inDateTime, outDateTime, 20, 1);
    });

    test('should return true when there is no overlap in attendance records', async () => {
        const insId = '123';
        const inDateTime = new Date('2024-02-19T08:00:00Z');
        const outDateTime = new Date('2024-02-19T10:00:00Z');

        // Mock the return value of getReport function
        instructorHelper.getReport.mockResolvedValueOnce([
            {
                attendance: [
                    { in: new Date('2024-02-19T05:00:00Z'), out: new Date('2024-02-19T07:00:00Z') },
                    { in: new Date('2024-02-19T12:00:00Z'), out: new Date('2024-02-19T14:00:00Z') }
                ]
            }
        ]);

        const result = await checkOverlap(insId, inDateTime, outDateTime);
        expect(result).toBe(true);
    });

    test('should handle database error', async () => {
        const insId = 'exampleInsId';
        const inDateTime = new Date('2024-02-19T08:00:00');
        const outDateTime = new Date('2024-02-19T09:00:00');
    
        // Mocking the getReport function to throw an error
        instructorHelper.getReport.mockRejectedValueOnce(new Error('Database error occurred'));
    
        // Expecting checkOverlap to throw an error and catching it
        await expect(checkOverlap(insId, inDateTime, outDateTime)).rejects.toThrow('Database error occurred');
    
        // Verify that getReport was called with the correct arguments
        expect(instructorHelper.getReport).toHaveBeenCalledWith(insId, inDateTime, outDateTime, 20, 1);
    });
});