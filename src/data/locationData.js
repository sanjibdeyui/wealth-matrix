export const countries = [
    { code: 'US', name: 'United States', zipRegex: /^\d{0,10}$/, maxZipStart: 5, maxZipLength: 5, zipLabel: 'Zip Code' },
    {
        code: 'CA',
        name: 'Canada',
        zipRegex: /^[A-Za-z0-9 ]{0,7}$/,
        maxZipStart: 3,
        maxZipLength: 7,
        zipLabel: 'Postal Code',
        format: (value) => {
            // Remove non-alphanumeric
            const clean = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
            if (clean.length > 3) {
                return `${clean.substring(0, 3)} ${clean.substring(3, 6)}`;
            }
            return clean;
        }
    },
    { code: 'UK', name: 'United Kingdom', zipRegex: /^[A-Za-z0-9 ]{0,8}$/, maxZipStart: 4, maxZipLength: 8, zipLabel: 'Postal Code' },
    { code: 'IN', name: 'India', zipRegex: /^\d{0,6}$/, maxZipStart: 6, maxZipLength: 6, zipLabel: 'Zip Code' },
    { code: 'AU', name: 'Australia', zipRegex: /^\d{0,4}$/, maxZipStart: 4, maxZipLength: 4, zipLabel: 'Zip Code' }
];

export const states = {
    US: [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
        'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
        'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ],
    CA: [
        'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'
    ],
    UK: [
        'England', 'Scotland', 'Wales', 'Northern Ireland'
    ],
    IN: [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
        'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ],
    AU: [
        'New South Wales', 'Queensland', 'South Australia', 'Tasmania', 'Victoria', 'Western Australia'
    ]
};
