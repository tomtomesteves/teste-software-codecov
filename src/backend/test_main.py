import unittest
from main import custom_sum, custom_div


class test_main(unittest.TestCase):
    def test_sum_positive(self):
        self.assertEqual(custom_sum(2, 3), 5)

    def test_sum_negative(self):
        self.assertEqual(custom_sum(-2, 3), 1)

    def test_div(self):
        self.assertEqual(custom_div(3, 2), 1.5)

    def test_div_exception(self):
        with self.assertRaises(ZeroDivisionError):
            custom_div(2, 0)
