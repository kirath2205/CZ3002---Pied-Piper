from django.contrib.auth.tokens import PasswordResetTokenGenerator
from six import text_type
from django.utils.http import base36_to_int, int_to_base36
from django.utils.crypto import constant_time_compare

class TokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, details, timestamp):
        user_id_text=text_type(details.get('user_id'))
        timestamp_text=text_type(timestamp)
        email_confirmed_text=text_type(details.get('email_confirmed'))
        return (
            user_id_text+timestamp_text+email_confirmed_text
        )
    def check_token(self, user, token):
        """
        Check that a password reset token is correct for a given user.
        """
        if not (user and token):
            return False
        # Parse the token
        try:
            ts_b36, _ = token.split("-")
        except ValueError:
            return False

        try:
            ts = base36_to_int(ts_b36)
        except ValueError:
            return False

        # Check that the timestamp/uid has not been tampered with
        if not constant_time_compare(self._make_token_with_timestamp(user, ts), token):
            return False

        # Check the timestamp is within limit. Timestamps are rounded to
        # midnight (server time) providing a resolution of only 1 day. If a
        # link is generated 5 minutes before midnight and used 6 minutes later,
        # that counts as 1 day. Therefore, PASSWORD_RESET_TIMEOUT_DAYS = 1 means
        # "at least 1 day, could be up to 2."
        if (self._num_days(self._today()) - ts) >=1:
            return False

        return True


account_activation_token = TokenGenerator()