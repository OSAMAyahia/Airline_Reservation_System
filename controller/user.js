const User = require("../model/Passenger");
const bcrypt = require('bcrypt');
const flash = require('connect-flash');

exports.register = async (req, res) => {
    try {
        const data = req.body;
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // تحقق من وجود المستخدم بالفعل
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            req.flash('error_msg', 'Email already registered');
            return res.redirect('/users/register');
        }

        // إنشاء مستخدم جديد
        await User.create({
            name: data.name,
            password: hashedPassword,
            email: data.email,
            role:data.role
        });

        // إرسال رسالة نجاح وإعادة توجيه إلى صفحة تسجيل الدخول
        req.flash('success_msg', 'User registered successfully');
        res.redirect('/users/login');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error registering user');
    }
};







exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) { 
                // هنا نضيف معلومات الرحلة والتذكرة
                const flight = {
                    number: 'AB123',
                    departure: 'New York',
                    arrival: 'Los Angeles',
                    date: '2023-12-31',
                };
                const ticket = {
                    class: 'Economy',
                    seat: '12A',
                };
                res.render('dashboard', { user, flight, ticket });
            } else {
                res.status(401).send('Invalid credentials');
            }
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error logging in');
    }
};

exports.dashboard = (req, res) => {
    const user = req.user;
    const flight = {
        number: 'AB123',
        departure: 'New York',
        arrival: 'Los Angeles',
        date: '2023-12-31',
    };
    const ticket = {
        class: 'Economy',
        seat: '12A',
    };

    res.render('dashboard', {
        user: user,
        flight: flight,
        ticket: ticket,
    });
};
